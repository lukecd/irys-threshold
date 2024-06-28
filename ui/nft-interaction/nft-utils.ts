import { ethers } from "ethers";
import IrysThresholdKeyABI from "./IrysThresholdKeyABI";

const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string;

let provider: ethers.providers.Web3Provider | null = null;
let signer: ethers.Signer | null = null;

// @ts-ignore
if (typeof window !== "undefined" && window.ethereum) {
	// @ts-ignore
	provider = new ethers.providers.Web3Provider(window.ethereum);
	signer = provider.getSigner();
} else {
	console.error("Ethereum provider is not available");
}

export const mintNft = async (): Promise<void> => {
	if (!signer) {
		throw new Error("Wallet signer is not available");
	}

	try {
		const contract = new ethers.Contract(contractAddress, IrysThresholdKeyABI, signer);
		const tx = await contract.safeMint(await signer.getAddress());
		console.log("Transaction Hash:", tx.hash);
		const receipt = await tx.wait();
		console.log("Transaction was mined in block:", receipt.blockNumber);
	} catch (error) {
		console.error("Minting failed:", error);
	}
};

export const hasNft = async (): Promise<boolean> => {
	if (!signer) {
		throw new Error("Wallet signer is not available");
	}

	try {
		console.log("cehcking if hasNFT");
		const contract = new ethers.Contract(contractAddress, IrysThresholdKeyABI, provider!);
		console.log({ contract });

		const address = await signer.getAddress();
		console.log({ address });

		const balance = await contract.balanceOf(address);
		console.log({ balance });
		return balance > 0;
	} catch (error) {
		console.error("Checking NFT ownership failed:", error);
		return false;
	}
};

export const switchNetwork = async () => {
	const targetNetwork = {
		chainId: "0x13882", // 80002 in hex
		chainName: "Polygon Amoy Testnet",
		rpcUrls: [process.env.NEXT_PUBLIC_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology"],
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://amoy.polygonscan.com/"],
	};

	// @ts-ignore
	if (window.ethereum) {
		try {
			// @ts-ignore
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [targetNetwork],
			});
			window.location.reload();
		} catch (error) {
			console.error("Failed to switch network:", error);
		}
	} else {
		console.error("Ethereum provider is not available");
	}
};
