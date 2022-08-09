const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
		main: './src/_includes/ts/base/main.ts'
	},

	// output bundles (location)
	output: {
		path: path.resolve(__dirname, '../www/assets/js/'),
		filename: (process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js'),
		chunkFilename: (process.env.NODE_ENV === 'production' ? 'chunk.[name].[chunkhash].js' : 'chunk.[name].js'),
	},

	plugins: [
		new WebpackManifestPlugin({
			publicPath: '/assets/js/',
			// filter(file) { if (file.isInitial) return true }
		}),
	],
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	optimization: {	
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 30,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
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