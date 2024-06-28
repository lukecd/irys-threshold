import { useState, useEffect, useCallback } from "react";
import { createPublicClient, createWalletClient, custom, http, Address } from "viem";
import { sepolia } from "viem/chains";
import IrysThresholdKeyABI from "../nft-interaction/IrysThresholdKeyABI";

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

const hasNft = async (): Promise<boolean> => {
	if (!walletClient) {
		throw new Error("Wallet client is not available");
	}

	try {
		const [address] = await walletClient.getAddresses();
		const balance = (await publicClient.readContract({
			address: contractAddress,
			abi: IrysThresholdKeyABI,
			functionName: "balanceOf",
			args: [address],
		})) as bigint;
		return balance > 0;
	} catch (error) {
		console.error("Checking NFT ownership failed:", error);
		return false;
	}
};

const useHasNft = () => {
	const [hasNftState, setHasNftState] = useState<boolean | null>(null);

	const checkHasNft = useCallback(async () => {
		const result = await hasNft();
		if (result) {
			setHasNftState(true);
		}
		return result;
	}, []);

	useEffect(() => {
		if (hasNftState === null) {
			checkHasNft();
		}
	}, [hasNftState, checkHasNft]);

	return hasNftState;
};

export default useHasNft;
