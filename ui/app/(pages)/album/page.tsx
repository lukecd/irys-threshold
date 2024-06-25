import React from "react";
import PhotoView from "@/components/PhotoView";

const images = [
	{ src: "/temp/photo1.png", isHorizontal: true },
	{ src: "/temp/photo2.png", isHorizontal: true },
	{ src: "/temp/photo3.png", isHorizontal: true },
	{ src: "/temp/photo4.png", isHorizontal: false },
	{ src: "/temp/photo5.png", isHorizontal: true },
];

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
