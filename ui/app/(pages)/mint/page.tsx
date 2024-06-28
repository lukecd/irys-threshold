"use client";

import React, { useEffect, useState } from "react";
import { hasNft, mintNft } from "@/nft-interaction/nft-utils";
import Image from "next/image";
//@ts-ignore
import confetti from "canvas-confetti";
import Spinner from "@/components/Spinner"; // Assume you have a Spinner component
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NFT_METADATA_URL = "https://gateway.irys.xyz/Nk8ZZwM1XMrGXvhaqnKRPXY6nglGYt5DIAxo1d81JiE";

const MintPage = () => {
	const { isConnected } = useAccount();
	const [hasToken, setHasToken] = useState(false);
	const [loading, setLoading] = useState(true);
	const [minting, setMinting] = useState(false);
	const [nftMetadata, setNftMetadata] = useState<any>(null);

	useEffect(() => {
		const checkNftOwnership = async () => {
			const hasNftToken = await hasNft();
			setHasToken(hasNftToken);
			setLoading(false);
		};

		const fetchNftMetadata = async () => {
			const response = await fetch(process.env.NEXT_PUBLIC_NFT_METADATA_ADDRESS || "");
			const data = await response.json();
			console.log("metadata=", data);
			setNftMetadata(data);
		};

		if (isConnected) {
			checkNftOwnership();
			fetchNftMetadata();
		} else {
			setLoading(false);
		}
	}, [isConnected]);

	const handleMint = async () => {
		setMinting(true);
		await mintNft();
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
			colors: ["#FF8451", "#FFC46C"],
		});
		setMinting(false);
		setHasToken(true);
	};

	if (loading) {
		return <Spinner />;
	}

	if (hasToken) {
		return (
			<div className="flex flex-col items-center justify-start h-screen mt-[200px]">
				<p className="text-xl text-navBg">You already have an NFT, go enjoy the photos.</p>
			</div>
		);
	}

	return (
		<div className="relative flex flex-col items-center justify-start h-screen p-4">
			{isConnected ? (
				<>
					{nftMetadata && (
						<>
							<div className="border-4 border-accentOne p-4 rounded-lg">
								<Image src={nftMetadata.image} alt={nftMetadata.name} width={300} height={300} className="rounded-lg" />
								<h1 className="text-2xl text-navBg mt-4">{nftMetadata.name}</h1>
								<p className="text-navBg">{nftMetadata.description}</p>
							</div>
							<button
								onClick={handleMint}
								disabled={minting}
								className={`w-[300px] mt-8 py-2 text-white bg-accentOne rounded hover:bg-accentTwo transition ${
									minting ? "cursor-not-allowed" : "cursor-pointer"
								}`}
							>
								{minting ? <Spinner size="small" /> : "Mint NFT"}
							</button>
						</>
					)}
				</>
			) : (
				<>
					<div className="flex flex-col justify-center items-center mt-[100px]">
						<p className="text-3xl text-navBg">Connect your wallet first!</p>
						<div className="">
							<svg width="500" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M90,50 Q50,90 10,50"
									stroke="#FF8451"
									strokeWidth="3"
									fill="none"
									markerEnd="url(#arrowhead)"
								/>
								<defs>
									<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
										<polygon points="0 0, 10 3.5, 0 7" fill="#FF8451" />
									</marker>
								</defs>
							</svg>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MintPage;
