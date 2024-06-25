"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaInfoCircle, FaImages, FaBuromobelexperte } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { hasNft } from "@/nft-interaction/nft-utils";
import Image from "next/image";
import { useAccount } from "wagmi";

const SideNav: React.FC = () => {
	const { isConnected } = useAccount();
	const [hasToken, setHasToken] = useState(false);
	const [nftMetadata, setNftMetadata] = useState<any>(null);

	useEffect(() => {
		const checkNftOwnership = async () => {
			if (isConnected) {
				const hasNftToken = await hasNft();
				setHasToken(hasNftToken);
				if (hasNftToken) {
					const response = await fetch(process.env.NEXT_PUBLIC_NFT_METADATA_ADDRESS || "");
					const data = await response.json();
					setNftMetadata(data);
				}
			}
		};

		checkNftOwnership();
	}, [isConnected]);

	return (
		<div className="bg-navBg h-screen w-64 flex flex-col items-start p-4 space-y-6 sticky top-0">
			<div className="mt-10">
				<NavItem icon={<FaInfoCircle size={24} />} text="About" href="/" />
				<NavItem icon={<FaBuromobelexperte size={24} />} text="Mint NFT" href="/mint" />
				<NavItem icon={<FaImages size={24} />} text="View Photos" href="/album" />
			</div>
			{hasToken && nftMetadata && (
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
			<div className="mt-3 ">
				<ConnectButton />
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
