import { initialize, encrypt, conditions, domains, toHexString } from "@nucypher/taco";
import fs from "fs/promises";
import path from "path";
import { ethers } from "ethers";
import Irys from "@irys/sdk";
import dotenv from "dotenv";
dotenv.config();

////////////////////////////////////////// CONSTANTS //////////////////////////////////////////

const RPC_URL = "https://rpc-amoy.polygon.technology.";
const PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL);
const SIGNER = new ethers.Wallet(process.env.PRIVATE_KEY || "", PROVIDER);
const RITUAL_ID = 0;
const OWNS_NFT = new conditions.predefined.erc721.ERC721Balance({
	contractAddress: "0x0e015827278f1bC4fA8d155fD7E83668A892507d",
	chain: 80002,
	returnValueTest: {
		comparator: ">", // For demo purposes, set to >= so anyone can decrypt
		value: 0,
	},
});

////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////

const encryptData = async (message: string): Promise<string> => {
	const messageKit = await encrypt(PROVIDER, domains.TESTNET, message, OWNS_NFT, RITUAL_ID, SIGNER);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
	return encryptedMessageHex;
};

const storeData = async (encryptedMessageHex: string) => {
	const dataToUpload = JSON.stringify(encryptedMessageHex);
	const tags = [{ name: "Content-Type", value: "text/plain" }];
	const irys = new Irys({ network: "mainnet", token: "ethereum", key: process.env.PRIVATE_KEY });
	const receipt = await irys.upload(dataToUpload, { tags });
	console.log(`Data uploaded to Irys ==> https://gateway.irys.xyz/${receipt.id}`);
	return receipt.id;
};

const processImages = async (): Promise<void> => {
	// Initialize the TACo library first
	await initialize();

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

		console.log("And a pure text example");
		const encryptedData: string = await encryptData("Secret sauce");
		await storeData(encryptedData);
	} catch (error) {
		console.error("Failed to read directory:", error);
	}
};

processImages();
