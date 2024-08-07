"use client";

import React, { useState, useEffect } from "react";
import { CiLock } from "react-icons/ci";
import Spinner from "./Spinner";
import { hasNft, switchNetwork } from "@/wallet-interaction/wallet-utils";
import { getPorterUri, ThresholdMessageKit, decrypt, domains, initialize, fromBytes } from "@nucypher/taco";
import { ethers } from "ethers";

interface PhotoViewProps {
	url: string;
	isHorizontal: boolean;
}

const PhotoView: React.FC<PhotoViewProps> = ({ url, isHorizontal }) => {
	const [encrypted, setEncrypted] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [nftOwner, setNftOwner] = useState<boolean>(false);
	const [networkError, setNetworkError] = useState<boolean>(false);
	const [decryptedImage, setDecryptedImage] = useState<string | null>(null);

	useEffect(() => {
		const checkNftOwnership = async () => {
			const ownsNft = await hasNft();
			console.log({ ownsNft });
			setNftOwner(ownsNft);
		};

		const checkNetwork = async () => {
			if (window.ethereum) {
				try {
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const network = await provider.getNetwork();
					if (network.chainId !== 80002) {
						setNetworkError(true);
					} else {
						checkNftOwnership();
					}
				} catch (error) {
					console.error("Network check failed:", error);
				}
			}
		};

		checkNetwork();
	}, []);

	const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

	const handleDecrypt = async () => {
		setLoading(true);

		if (window.ethereum) {
			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				await initialize();

				const response = await fetch(`https://gateway.irys.xyz/${url}`);
				const dataJson = await response.text();
				console.log({ dataJson });

				const encryptedMessage = ThresholdMessageKit.fromBytes(Buffer.from(JSON.parse(dataJson), "hex"));
				console.log({ encryptedMessage });

				const decryptedMessage = await decrypt(
					provider,
					domains.TESTNET,
					encryptedMessage,
					getPorterUri(domains.TESTNET),
					signer,
				);
				console.log(`Data decrypted ==> `);

				const decryptedData = fromBytes(decryptedMessage);
				const base64Image = btoa(decryptedData);
				const dataUrl = `data:image/png;base64,${base64Image}`;
				setDecryptedImage(dataUrl);

				setLoading(false);
				setEncrypted(false);
			} catch (error) {
				console.error("Decryption failed:", error);
				setLoading(false);
			}
		} else {
			console.error("Ethereum provider is not available");
		}
	};

	const aspectRatioClass = isHorizontal ? "aspect-w-16 aspect-h-9" : "aspect-w-9 aspect-h-16";

	return (
		<div
			className={`relative ${aspectRatioClass} bg-mainBg flex items-center justify-center border-4 border-accentTwo`}
		>
			{loading ? (
				<div className="flex items-center justify-center w-full h-full">
					<Spinner size="large" />
				</div>
			) : encrypted ? (
				<div className="text-accentOne p-2 flex flex-col items-center justify-center">
					<CiLock size={64} />
					{nftOwner ? (
						<button className="mt-4 px-4 py-2 bg-accentOne text-white rounded" onClick={handleDecrypt}>
							Decrypt
						</button>
					) : (
						<span>Mint the NFT to decrypt</span>
					)}
				</div>
			) : decryptedImage ? (
				<img src={decryptedImage} alt="Decrypted Photo" className="w-full h-full object-cover" />
			) : (
				<img src={`https://gateway.irys.xyz/${url}`} alt="Photo" className="w-full h-full object-cover" />
			)}
		</div>
	);
};

export default PhotoView;
