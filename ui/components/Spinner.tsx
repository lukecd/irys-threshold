import React from "react";

interface SpinnerProps {
	size?: "small" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "small" }) => {
	const spinnerSizeClass = size === "large" ? "w-16 h-16" : "w-6 h-6";
	return (
		<div className="flex items-center justify-center">
			<div
				className={`${spinnerSizeClass} border-10 border-t-4 border-gray-200 border-t-accentOne rounded-full animate-spin`}
			></div>
		</div>
	);
};

export default Spinner;
