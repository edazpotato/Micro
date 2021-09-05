module.exports = {
	stories: ["../src/stories/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-essentials",
		"storybook-tailwind-dark-mode",
		"@storybook/addon-a11y",
		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require("postcss"),
				},
			},
		},
	],
};
