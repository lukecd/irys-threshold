"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaInfoCircle, FaImages, FaBuromobelexperte } from "react-icons/fa";
import Image from "next/image";
import { ethers } from "ethers";
import useHasNft from "@/hooks/useHasNft";
import { switchNetwork } from "@/nft-interaction/nft-utils";

const SideNav: React.FC = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [account, setAccount] = useState<string | null>(null);
	const [nftMetadata, setNftMetadata] = useState<any>(null);
	const [networkError, setNetworkError] = useState<boolean>(false);
	const hasNft = useHasNft();

	useEffect(() => {
		const checkConnection = async () => {
			//@ts-ignore
			if (window.ethereum) {
				try {
					//@ts-ignore
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const accounts = await provider.listAccounts();
					if (accounts.length > 0) {
						const signer = provider.getSigner();
						const userAccount = await signer.getAddress();
						setAccount(userAccount);
						setIsConnected(true);

						const network = await provider.getNetwork();
						if (network.chainId !== 80002) {
							setNetworkError(true);
						} else {
							setNetworkError(false);
							checkNftOwnership();
						}
					}
				} catch (error) {
					console.error("Failed to check connection:", error);
				}
			}
		};

		const checkNftOwnership = async () => {
			if (isConnected && account) {
				if (hasNft) {
					const response = await fetch(process.env.NEXT_PUBLIC_NFT_METADATA_ADDRESS || "");
					const data = await response.json();
					setNftMetadata(data);
				}
			}
		};

		checkConnection();
	}, [isConnected, account, hasNft]);

	const connectWallet = async () => {
		//@ts-ignore
		if (window.ethereum) {
			try {
				//@ts-ignore
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				setAccount(address);
				setIsConnected(true);

				const network = await provider.getNetwork();
				if (network.chainId !== 80002) {
					setNetworkError(true);
				} else {
					setNetworkError(false);
				}
			} catch (error) {
				console.error("Connection failed:", error);
			}
		} else {
			console.error("Ethereum provider is not available");
		}
	};

	const disconnectWallet = () => {
		setAccount(null);
		setIsConnected(false);

		// Clear local storage/session storage where wallets might save their state
		localStorage.removeItem("walletconnect");
		sessionStorage.removeItem("walletconnect");

		// Clear MetaMask state if necessary
		//@ts-ignore
		if (window.ethereum && window.ethereum.disconnect) {
			//@ts-ignore
			window.ethereum.disconnect();
		}

		// Optionally, reload the page to ensure a fresh state
		window.location.reload();

		console.log("Wallet disconnected, isConnected:", isConnected, "account:", account); // Add logs to check state
	};

	const truncateAddress = (address: string | null) => {
		if (!address) return "";
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className="bg-navBg h-screen w-64 flex flex-col items-start p-4 space-y-6 sticky top-0">
			<div className="mt-10">
				<NavItem icon={<FaInfoCircle size={24} />} text="About" href="/" />
				<NavItem icon={<FaBuromobelexperte size={24} />} text="Mint NFT" href="/mint" />
				<NavItem icon={<FaImages size={24} />} text="View Photos" href="/album" />
			</div>
			{hasNft && nftMetadata && (
				<div className="mt-10 pt-10 w-full">
					<div className="border-4 border-accentOne p-2 rounded-lg w-full">
						<div className="relative w-full aspect-w-1 aspect-h-1">
							<Image
								src={nftMetadata.image}
								alt={nftMetadata.name}
								layout="fill"
								objectFit="cover"
								className="rounded-lg"
							/>
						</div>
						<p className="text-navBg mt-2 text-center">{nftMetadata.name}</p>
					</div>
				</div>
			)}
			<div className="mt-3">
				{networkError ? (
					<button onClick={switchNetwork} className="bg-accentOne text-mainBg p-2 rounded-lg">
						Switch Network
					</button>
				) : isConnected ? (
					<div className="flex flex-col items-start space-y-2">
						<p className="text-mainBg font-semibold">
							Connected: <span className="text-accentOne">{truncateAddress(account)}</span>
						</p>
						<button onClick={disconnectWallet} className="bg-accentOne text-mainBg p-2 rounded-lg">
							Disconnect Wallet
						</button>
					</div>
				) : (
					<button onClick={connectWallet} className="bg-accentOne text-mainBg p-2 rounded-lg">
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	);
};

interface NavItemProps {
	icon: React.ReactNode;
	text: string;
	href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, href }) => {
	return (
		<Link href={href}>
			<div className="group flex items-center space-x-4 p-2 hover:bg-opacity-20 transition-all duration-300 ease-in-out cursor-pointer">
				<div className="text-mainBg group-hover:text-accentOne transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ease-in-out">
					{icon}
				</div>
				<span className="text-mainBg group-hover:underline group-hover:text-accentTwo group-hover:underline-thickness transition-all duration-300 ease-in-out">
					{text}
				</span>
			</div>
		</Link>
	);
};

export default SideNav;
