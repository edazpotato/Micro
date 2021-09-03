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
	// webpackFinal: async (config) => {
	// 	config.module.rules.push({
	// 		test: /\.scss$/,
	// 		use: ["css-loader", "style-loader"],
	// 	});

	// 	return config;
	// },
};
