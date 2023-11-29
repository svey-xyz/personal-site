/** @type {import('next').NextConfig} */

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

const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['img.shields.io']
	},
	webpack(config) {
		config.module.rules.push(
			{
				test: /\.glsl$/,
				use: (process.env.NODE_ENV === 'production' ? GLSLMinifyLoader : GLSLLoader),
				exclude: /node_modules/,
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				type: "asset/source",
			}
		)
		return config
	},
}

module.exports = nextConfig
