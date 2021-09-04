module.exports = {
	stories: ["../src/stories/**/*.stories.tsx"],
	addons: [
		"@storybook/addon-essentials",
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
