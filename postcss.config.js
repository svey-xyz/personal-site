

module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),
		require('tailwindcss')('./src/style/tailwind.config.js'),
		require('postcss-nesting'),
		require('autoprefixer'),
		require('cssnano')({
			preset: 'default',
		}),
	],
};