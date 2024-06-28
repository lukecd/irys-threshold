import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import IrysThresholdKeyABI from "../nft-interaction/IrysThresholdKeyABI";

const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string;

let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;
//@ts-ignore
if (typeof window !== "undefined" && window.ethereum) {
	//@ts-ignore
	provider = new ethers.providers.Web3Provider(window.ethereum);
	signer = provider.getSigner();
} else {
	console.error("Ethereum provider is not available");
}

const hasNft = async (): Promise<boolean> => {
	if (!signer) {
		throw new Error("Wallet signer is not available");
	}

	try {
		//@ts-ignore
		const contract = new ethers.Contract(contractAddress, IrysThresholdKeyABI, provider);
		const address = await signer.getAddress();
		const balance = await contract.balanceOf(address);
		return balance.gt(0);
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
