const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

	// bundling mode
	mode: 'production',

	// entry files
	entry: {
		'js/main': "./src/_includes/ts/main.ts",
		'js/pages/home': "./src/_includes/ts/pages/home.ts",	
		'js/pages/archive-projects': "./src/_includes/ts/pages/archive-projects.ts"
	},
	// devtool: 'inline-source-map',

	// output bundles (location)
	output: {
		path: path.resolve(__dirname, 'www/assets/'),
		filename: '[name].js',
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},

	// file resolutions
	resolve: {
		extensions: ['.ts', '.js'],
	},

	watchOptions: {
		aggregateTimeout: 600,
		ignored: /node_modules/,
	},

	stats: 'minimal',

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
			},
			{
				test: /\.glsl$/,
				use: [{
					loader: 'webpack-glsl-minify',
					options: {
						output: 'source',
						esModule: false,
						preserveAll: true
					}
				}],
				exclude: /node_modules/,
			}
		]
	}
};