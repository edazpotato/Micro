module.exports = {
	mode: "jit",
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "media", // or 'false' or 'class'
	theme: {
		colors: {
			tansparent: "transparent",
			current: "currentColor",
			blue: "#23539E",
			red: "#9E2323",
			green: "#239E2F",
			pink: "#9E2348",

			background: "#D8D8D8",
			foreground: "#E5E5E5",
			inset: "#E9E9E9",
			border: "#E9E9E9",
			icon: "#888888",
			"header-icon": "#B5B5B5",
			text: "#000000",
			placeholder: "#777777",

			"background-d": "#111111",
			"foreground-d": "#222222",
			"inset-d": "#333333",
			"border-d": "#444444",
			"icon-d": "#888888",
			"header-icon-d": "#555555",
			"text-d": "#FFFFFF",
			"placeholder-d": "#777777",
		},
		borderRadius: {
			DEFAULT: "8px",
			full: "999px",
		},
		strokeWidth: {
			["1"]: "1",
			["2"]: "2",
			["2.5"]: "2.5",
			["3"]: "3",
			["4"]: "4",
			["8"]: "8",
			["16"]: "16",
			["32"]: "32",
		},
		fontSize: {
			massive: "30px",
			huge: "20px",
			large: "18px",
			normal: "14px",
		},

		spacing: {
			["0"]: "0px",
			["2"]: "2px",
			["4"]: "4px",
			["6"]: "6px",
			["12"]: "12px",
			["24"]: "24px",
			["48"]: "48px",
			["60"]: "60px",
			["84"]: "84px",
			["120"]: "120px",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
