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

const rpcUrl = "https://rpc-amoy.polygon.technology.";
// const rpcUrl = "https://eth-sepolia.g.alchemy.com/v2/GhM1EP2edH5wym1A9B0u2NifZVgWAmz2";
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
const ritualId = 0;
const ownsNft = new conditions.predefined.erc721.ERC721Balance({
	contractAddress: "0x0e015827278f1bC4fA8d155fD7E83668A892507d",
	chain: 80002,
	returnValueTest: {
		comparator: ">=", // For demo purposes, set to >= so anyone can run this file
		value: 0,
	},
});
const irys = new Irys({ network: "mainnet", token: "ethereum", key: process.env.PRIVATE_KEY });

////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////

const encryptData = async (message: string): Promise<string> => {
	const messageKit = await encrypt(provider, domains.TESTNET, message, ownsNft, ritualId, signer);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
	console.log(`Data encrypted ==> `);
	console.log(encryptedMessageHex);
	return encryptedMessageHex;
};

const uploadData = async (encryptedMessageHex: string): Promise<string> => {
	const dataToUpload = JSON.stringify(encryptedMessageHex);
	const tags = [{ name: "Content-Type", value: "text/plain" }];
	const receipt = await irys.upload(dataToUpload, { tags });
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
	console.log(encryptedMessage);

	const decryptedMessage = await decrypt(
		provider,
		domains.TESTNET,
		encryptedMessage,
		getPorterUri(domains.TESTNET),
		signer,
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
