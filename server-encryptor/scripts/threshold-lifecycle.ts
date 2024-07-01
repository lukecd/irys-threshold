import {
	initialize,
	encrypt,
	conditions,
	domains,
	toHexString,
	decrypt,
	ThresholdMessageKit,
	getPorterUri,
} from "@nucypher/taco";
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
		comparator: ">=", // For demo purposes, set to >= so anyone can run this file
		value: 0,
	},
});
const IRYS = new Irys({ network: "mainnet", token: "ethereum", key: process.env.PRIVATE_KEY });

////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////

const encryptData = async (message: string): Promise<string> => {
	const messageKit = await encrypt(PROVIDER, domains.TESTNET, message, OWNS_NFT, RITUAL_ID, SIGNER);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
	console.log(`Data encrypted ==> `);
	console.log(encryptedMessageHex);
	return encryptedMessageHex;
};

const uploadData = async (encryptedMessageHex: string): Promise<string> => {
	const dataToUpload = JSON.stringify(encryptedMessageHex);
	const tags = [{ name: "Content-Type", value: "text/plain" }];
	const receipt = await IRYS.upload(dataToUpload, { tags });
	console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
	return receipt.id;
};

const downloadData = async (txId: string): Promise<string> => {
	const response = await fetch(`https://gateway.irys.xyz/${txId}`);
	const dataJson = await response.text();
	console.log(`Data downloaded ==> `);
	console.log(dataJson);
	return dataJson;
};

const decryptData = async (dataJson: string): Promise<string> => {
	const encryptedMessage = ThresholdMessageKit.fromBytes(Buffer.from(JSON.parse(dataJson), "hex"));
	console.log(`Data parsed `);
	const decryptedMessage = await decrypt(
		PROVIDER,
		domains.TESTNET,
		encryptedMessage,
		getPorterUri(domains.TESTNET),
		SIGNER,
	);
	console.log(`Data decrypted ==> `);
	console.log(decryptedMessage);
	return decryptedMessage.toString();
};

const main = async (): Promise<void> => {
	// Initialize the TACo library first
	await initialize();

	const message = "Top secret";
	console.log("1. ENCRYPTING");
	const encryptedData = await encryptData(message);
	console.log("2. UPLOADING");
	const uplodedTxId = await uploadData(encryptedData);
	console.log("3. DOWNLOADING");
	const downloadedData = await downloadData(uplodedTxId);
	console.log("4. DECRYPTING");
	const decryptedData = await decryptData(downloadedData);
};

main();
