import { initialize, encrypt, conditions, domains, toHexString } from "@nucypher/taco";
import fs from "fs/promises";
import path from "path";
import { ethers } from "ethers";
import Irys from "@irys/sdk";
import dotenv from "dotenv";
dotenv.config();

const encryptData = async (dataToEncrypt: string) => {
	// const privateKey: string = process.env.PRIVATE_KEY;
	// const rpcUrl = "https://eth-sepolia.api.onfinality.io/public";
	const provider = new ethers.providers.JsonRpcProvider();
	const signer = await provider.getSigner();

	// Initialize the TACo library first
	await initialize();

	const ownNft = new conditions.predefined.erc721.ERC721Balance({
		contractAddress: "0x3a4bFDe618C7E0EC1D444F7fe86c8984Fb1E70CE",
		chain: 11155111,
		returnValueTest: {
			comparator: ">",
			value: 0,
		},
	});
	console.log({ ownNft });
	const ritualId = 0;
	const messageKit = await encrypt(provider, domains.TESTNET, dataToEncrypt, ownNft, ritualId, signer);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
	return encryptedMessageHex;
};

const storeData = async (dataToStore: string) => {
	const irys = new Irys({ network: "mainnet", token: "ethereum", key: process.env.PRIVATE_KEY });
	const dataToUpload = JSON.stringify(dataToStore);
	const receipt = await irys.upload(dataToUpload);
	console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
};

const processImages = async (): Promise<void> => {
	const directoryPath = path.join(__dirname, "../source-images/");
	try {
		const files: string[] = await fs.readdir(directoryPath);
		for (const file of files) {
			if (path.extname(file) === ".png") {
				const filePath = path.join(directoryPath, file);
				const imageData: Buffer = await fs.readFile(filePath);
				const binaryString: string = imageData.toString("binary");

				try {
					const encryptedData: string = await encryptData(binaryString);
					await storeData(encryptedData);
					console.log(`Processed and uploaded ${file}`);
				} catch (error) {
					console.error(`Error processing ${file}:`, error);
				}
			}
		}
	} catch (error) {
		console.error("Failed to read directory:", error);
	}
};

processImages();
