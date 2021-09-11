import "../src/styles/globals.css";
import "@fontsource/inter";
import "../src/styles/tailwind.css";

import { addDecorator, addParameters } from "@storybook/react";

import { withA11y } from "@storybook/addon-a11y";

// import "../src/styles/nprogress.scss";

const backgrounds = {
	// default: "light",
	values: [
		// {
		// 	name: "light",
		// 	value: "#D8D8D8",
		// },
		// {
		// 	name: "dark",
		// 	value: "#111111",
		// },
	],
};

const a11y = {
	element: "#root *",
};

addParameters({
	backgrounds,
	a11y,
});

addDecorator(withA11y);

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
};
