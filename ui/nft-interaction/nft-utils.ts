import { createPublicClient, createWalletClient, custom, http, Address } from "viem";
import { sepolia } from "viem/chains";
import IrysThresholdKeyABI from "./IrysThresholdKeyABI";

const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as Address;

const publicClient = createPublicClient({
	chain: sepolia,
	transport: http("https://gateway.tenderly.co/public/sepolia"),
});

let walletClient;

if (typeof window !== "undefined" && window.ethereum) {
	walletClient = createWalletClient({
		chain: sepolia,
		transport: custom(window.ethereum),
	});
} else {
	walletClient = null;
	console.error("Ethereum provider is not available");
}

export const mintNft = async (): Promise<void> => {
	if (!walletClient) {
		throw new Error("Wallet client is not available");
	}

	try {
		const [account] = await walletClient.getAddresses();
		const hash = await walletClient.writeContract({
			address: contractAddress,
			abi: IrysThresholdKeyABI,
			functionName: "safeMint",
			args: [account],
			account,
		});
		console.log("Transaction Hash:", hash);
		const receipt = await publicClient.waitForTransactionReceipt({ hash });
		console.log("Transaction was mined in block:", receipt.blockNumber);
	} catch (error) {
		console.error("Minting failed:", error);
	}
};

export const hasNft = async (): Promise<boolean> => {
	if (!walletClient) {
		throw new Error("Wallet client is not available");
	}

	try {
		const [address] = await walletClient.getAddresses();
		console.log({ address });
		console.log(publicClient);
		const balance = (await publicClient.readContract({
			address: contractAddress,
			abi: IrysThresholdKeyABI,
			functionName: "balanceOf",
			args: [address],
		})) as bigint;
		console.log({ balance });
		return balance > 0;
	} catch (error) {
		console.error("Checking NFT ownership failed:", error);
		return false;
	}
};
