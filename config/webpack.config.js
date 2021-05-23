const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

const GLSLMinifyLoader = [{
	loader: 'webpack-glsl-minify',
	options: {
		output: 'source',
		esModule: false,
		preserveAll: true
	}
}];

const GLSLLoader = [{
	loader: 'webpack-glsl-loader',
	options: {
		esModule: false
	}
}]

module.exports = {

	// bundling mode
	mode: 'production',

	// entry files
	entry: {
		main: "./src/_includes/ts/base/main.ts",
	},
	devtool: (process.env.NODE_ENV === 'production' ? '' : 'inline-source-map'),

	// output bundles (location)
	output: {
		path: path.resolve(__dirname, '../www/assets/js'),
		filename: '[name].js',
	},

	optimization: {	
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
		minimize: (process.env.NODE_ENV === 'production' ? true : false),
		minimizer: (process.env.NODE_ENV === 'production' ? [new TerserPlugin()] : []),
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
						configFile: "config/tsconfig.json"
					}
				}],
				exclude: /node_modules/,
			},
			{
				test: /\.glsl$/,
				use: (process.env.NODE_ENV === 'production' ? GLSLMinifyLoader : GLSLLoader),
				exclude: /node_modules/,
			}
		]
	}
};