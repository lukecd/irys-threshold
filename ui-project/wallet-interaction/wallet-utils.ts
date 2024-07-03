import { ethers } from "ethers";
import IrysThresholdKeyABI from "./IrysThresholdKeyABI";

const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string;

export const connectWallet = async (): Promise<{
	account: string | null;
	networkError: boolean;
}> => {
	let ethereumProvider: EthereumProvider | undefined;
	let account: string | null = null;
	let networkError = false;

	if (window.ethereum && window.ethereum.providers) {
		ethereumProvider = window.ethereum.providers.find((provider) => provider.isMetaMask);
	}

	if (!ethereumProvider && window.ethereum) {
		ethereumProvider = window.ethereum;
	}

	if (ethereumProvider) {
		try {
			const provider = new ethers.providers.Web3Provider(ethereumProvider as any);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			account = await signer.getAddress();

			const network = await provider.getNetwork();
			if (network.chainId !== 80002) {
				networkError = true;
			}
		} catch (error) {
			console.error("Connection failed:", error);
		}
	} else {
		console.error("Ethereum provider is not available");
	}

	return { account, networkError };
};

export const disconnectWallet = (): void => {
	localStorage.removeItem("walletconnect");
	sessionStorage.removeItem("walletconnect");

	if (window.ethereum && window.ethereum.disconnect) {
		window.ethereum.disconnect();
	}

	window.location.reload();
};

export const mintNft = async (): Promise<void> => {
	if (!window.ethereum) {
		throw new Error("Ethereum provider is not available");
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	if (!signer) {
		throw new Error("Wallet signer is not available");
	}

	try {
		const contract = new ethers.Contract(contractAddress, IrysThresholdKeyABI, signer);
		console.log({ contract });

		const tx = await contract.safeMint(await signer.getAddress());
		console.log("Transaction Hash:", tx.hash);
		const receipt = await tx.wait();
		console.log("Transaction was mined in block:", receipt.blockNumber);
	} catch (error) {
		console.error("Minting failed:", error);
	}
};

export const hasNft = async (): Promise<boolean> => {
	if (!window.ethereum) {
		throw new Error("Ethereum provider is not available");
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();

	if (!signer) {
		throw new Error("Wallet signer is not available");
	}

	try {
		const contract = new ethers.Contract(contractAddress, IrysThresholdKeyABI, provider);
		const address = await signer.getAddress();
		const balance = await contract.balanceOf(address);
		return balance > 0;
	} catch (error) {
		console.error("Checking NFT ownership failed:", error);
		return false;
	}
};

export const switchNetwork = async (): Promise<void> => {
	console.log("switchNetwork called");

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
	console.log("Target Network:", targetNetwork);

	if (window.ethereum) {
		console.log("window.ethereum is available");

		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: targetNetwork.chainId }],
			});
			console.log("Network switch request sent");
			window.location.reload();
			console.log("Page reloaded");
		} catch (error: any) {
			if (error.code === 4902) {
				console.log("Network not found in MetaMask, adding network...");
				try {
					await window.ethereum.request({
						method: "wallet_addEthereumChain",
						params: [targetNetwork],
					});
					console.log("Network added, switching now...");
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: targetNetwork.chainId }],
					});
					window.location.reload();
					console.log("Page reloaded after adding network");
				} catch (addError) {
					console.error("Failed to add network:", addError);
				}
			} else {
				console.error("Failed to switch network:", error);
			}
		}
	} else {
		console.error("Ethereum provider is not available");
		alert("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");
	}
};
