import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				mainBg: "#000000", // black
				navBg: "#FEF4EE",
				accentOne: "#FF8451",
				accentTwo: "#FFC46C",
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};

export default config;
