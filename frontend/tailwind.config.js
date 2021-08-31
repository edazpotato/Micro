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

			"background-d": "#111111",
			"foreground-d": "#222222",
			"inset-d": "#333333",
			"border-d": "#444444",
			"header-icon-d": "#555555",
			"icon-d": "#888888",
			"text-d": "#FFFFFF",
			"placeholder-d": "#777777",
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
