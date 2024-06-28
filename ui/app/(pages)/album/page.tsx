import React from "react";
import PhotoView from "@/components/PhotoView";

const images = [
	{ src: "9k3OeV2i20QUOd3toG6w_KKR5g0LOCu0puU4HKRoa6M", isHorizontal: true },
	{ src: "RTXIDzsdMU_RET5y9owjYFyywJjsVtCp24lFT3jQTYE", isHorizontal: true },
	{ src: "7yTzbRdB30q3P01aQMD7eXkGv-RdBkNbFnEWhP6BFB8", isHorizontal: true },
	{ src: "R5sOD5Hkdva_W0D070WpJ4EHoC7vjb4qqAAfW5fgs_T8", isHorizontal: false },
	{ src: "xVXPLdSpT9HFjJL9nFU22TUfCMikNpHdHKIHLRyJs8U", isHorizontal: true },
];
//plain text
//https://gateway.irys.xyz/isD7URj_FqF7h_V-gfqqGgG_JmNL1xThjS1LDSRUEg8

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
