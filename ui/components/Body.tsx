"use client";
import React, { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import SideNav from "@/components/SideNav";

type BodyProps = {
	children: ReactNode;
};

const Body: React.FC<BodyProps> = ({ children }) => {
	return (
		<div className="flex">
			<SideNav />
			<div className="flex-1 p-8">{children}</div>
		</div>
	);
};

export default Body;
