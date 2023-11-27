/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')()

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
	pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	webpack(config) {
		config.module.rules.push(
			{
				test: /\.glsl$/,
				use: (process.env.NODE_ENV === 'production' ? GLSLMinifyLoader : GLSLLoader),
				exclude: /node_modules/,
			},
		)
		return config
	},
}

module.exports = withMDX(nextConfig)
