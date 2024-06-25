import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/SideNav";
const inter = Inter({ subsets: ["latin"] });
import Body from "@/components/Body";
import { Lilita_One } from "next/font/google";

export const metadata: Metadata = {
	title: "Irys+Threshold",
	description: "This real token gating",
};

const pageFont = Lilita_One({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={pageFont.className}>
				<Body>{children}</Body>
			</body>
		</html>
	);
}
