import { initialize, encrypt, conditions, domains, toHexString } from "@nucypher/taco";

import { ethers } from "ethers";
import Irys from "@irys/sdk";
import dotenv from "dotenv";
dotenv.config();

const setUp = async () => {
	// const privateKey: string = process.env.PRIVATE_KEY;
	const rpcUrl = "https://eth-sepolia.api.onfinality.io/public";
	const provider = new ethers.providers.JsonRpcProvider();
	const signer = await provider.getSigner();

	// Initialize the TACo library first
	await initialize();

	const ownNft = new conditions.predefined.erc721.ERC721Balance({
		contractAddress: "0x1e988ba4692e52Bc50b375bcC8585b95c48AaD77",
		chain: 111155111,
		returnValueTest: {
			comparator: ">",
			value: 0,
		},
	});
	const ritualId = 0;

	const message = "this will be here forever"; // this will be an image

	const messageKit = await encrypt(provider, domains.TESTNET, message, ownNft, ritualId, signer);
	const encryptedMessageHex = toHexString(messageKit.toBytes());
};
