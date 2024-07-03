import React from "react";
import PhotoView from "@/components/PhotoView";

const images = [
	{ src: "yvM5pF5-jE74zVluJtMAad6mBKjyw9yAXORM_2hnM_Y", isHorizontal: true },
	{ src: "xgvDnf75NcYD3l5MHZb1g9wG3Hf348x4ncYzZDx8kyA", isHorizontal: true },
	{ src: "3e2-MzgDCDjT6Tm79Yzb3fXkx7rSvAihInXP86Utkoc", isHorizontal: true },
	{ src: "YT-_JryldDuo590bv80ptsi65lsfgbBysAXJVU0VDzI", isHorizontal: false },
	{ src: "GnkRcbZlxd-gAIcNNzh8OYXni0-Iva-_VJDv2F74UvI", isHorizontal: true },
];

//plain text VbbFGGM0OkPUEQEslcdcsEBR0URbOWCXZpjP0rUxLVc

const Page: React.FC = () => {
	return (
		<div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
			<div className="col-span-2 row-span-2">
				<PhotoView url={images[0].src} isHorizontal={images[0].isHorizontal} />
			</div>
			<div className="col-span-1 row-span-1">
				<PhotoView url={images[1].src} isHorizontal={images[1].isHorizontal} />
			</div>
			<div className="col-span-1 row-span-1">
				<PhotoView url={images[2].src} isHorizontal={images[2].isHorizontal} />
			</div>
			<div className="col-span-1 row-span-2">
				<PhotoView url={images[3].src} isHorizontal={images[3].isHorizontal} />
			</div>
			<div className="col-span-2 row-span-1">
				<PhotoView url={images[4].src} isHorizontal={images[4].isHorizontal} />
			</div>
		</div>
	);
};

export default Page;
