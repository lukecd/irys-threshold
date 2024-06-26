"use client";

import React, { useState } from "react";
import { CiLock } from "react-icons/ci";

interface PhotoViewProps {
	url: string;
	isHorizontal: boolean;
}

const PhotoView: React.FC<PhotoViewProps> = ({ url, isHorizontal }) => {
	const [encrypted, setEncrypted] = useState<boolean>(false);

	const aspectRatioClass = isHorizontal ? "aspect-w-16 aspect-h-9" : "aspect-w-9 aspect-h-16";

	return (
		<div className={`relative ${aspectRatioClass} bg-mainBg flex items-center justify-center`}>
			{encrypted ? (
				<div className="text-accentOne p-2 border-4 border-accentTwo flex flex-col items-center justify-center">
					<CiLock size={64} />
					(Mint the NFT to decrypt)
				</div>
			) : (
				<img src={url} alt="Photo" className="w-full h-full object-cover" />
			)}
		</div>
	);
};

export default PhotoView;
