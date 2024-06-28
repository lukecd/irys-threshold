"use client";
import React, { ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { berachainTestnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import SideNav from "@/components/SideNav";

const queryClient = new QueryClient();
const config = getDefaultConfig({
	appName: "Irys + Threshold",
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
	chains: [sepolia],
	ssr: true, // If your dApp uses server side rendering (SSR)
	transports: {
		[sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC),
	},
});

type BodyProps = {
	children: ReactNode;
};

const Body: React.FC<BodyProps> = ({ children }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider
					theme={darkTheme({
						accentColor: "#FF8451",
						accentColorForeground: "white",
					})}
					initialChain={sepolia}
				>
					<div className="flex">
						<SideNav />
						<div className="flex-1 p-8">{children}</div>
					</div>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default Body;
