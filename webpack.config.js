const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

	// bundling mode
	mode: 'production',

	// entry files
	// entry: './src/_ts/pages/home.ts',
	entry: {
		main: "./src/_includes/ts/main.ts",
		home: "./src/_includes/ts/pages/home.ts",
		"archive-projects": "./src/_includes/ts/pages/archive-projects.ts"
	},
	// devtool: 'inline-source-map',

	// output bundles (location)
	output: {
		path: path.resolve(__dirname, 'www/assets/js'),
		filename: '[name].js',
	},

	// optimization: {
	// 	minimize: true,
	// 	minimizer: [new TerserPlugin()],
	// },

	// file resolutions
	resolve: {
		extensions: ['.ts', '.js'],
	},

	watchOptions: {
		aggregateTimeout: 600,
		ignored: /node_modules/,
	},

	// loaders
	module: {
		rules: [
			{
				test: /\.tsx?/,
				use: [{
					loader: 'ts-loader',
					options: {
						configFile: "tsconfig.json"
					}
				}],
				exclude: /node_modules/,
			}
		]
	}
};