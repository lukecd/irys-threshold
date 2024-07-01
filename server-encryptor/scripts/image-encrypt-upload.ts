import { initialize, encrypt, conditions, domains, toHexString } from "@nucypher/taco";
import fs from "fs/promises";
import path from "path";
import { ethers } from "ethers";
import Irys from "@irys/sdk";
import dotenv from "dotenv";
dotenv.config();

////////////////////////////////////////// CONSTANTS //////////////////////////////////////////

const rpcUrl = "https://rpc-amoy.polygon.technology.";
// const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/GhM1EP2edH5wym1A9B0u2NifZVgWAmz2";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
const ritualId = 0;
const ownNft = new conditions.predefined.erc721.ERC721Balance({
	contractAddress: "0x0e015827278f1bC4fA8d155fD7E83668A892507d",
	chain: 80002,
	returnValueTest: {
		comparator: ">",
		value: 0,
	},
});
const irys = new Irys({ network: "mainnet", token: "ethereum", key: process.env.PRIVATE_KEY });

// Initialize the TACo library first
await initialize();

////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////

const encryptData = async (dataToEncrypt: string) => {
	const messageKit = await encrypt(provider, domains.TESTNET, dataToEncrypt, ownNft, ritualId, signer);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
	return JSON.stringify(encryptedMessageHex);
};

const storeData = async (dataToStore: string) => {
	// const dataToUpload = JSON.stringify(dataToStore);
	const tags = [{ name: "Content-Type", value: "text/plain" }];
	const receipt = await irys.upload(dataToStore, { tags });
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
					// const encryptedData: string = await encryptData(binaryString);
					// await storeData(encryptedData);
					console.log(`Processed and uploaded ${file}`);
				} catch (error) {
					console.error(`Error processing ${file}:`, error);
				}
			}
		}

		console.log("And a pure text example");
		const encryptedData: string = await encryptData("Secret sauce");
		await storeData(encryptedData);
	} catch (error) {
		console.error("Failed to read directory:", error);
	}
};

processImages();
