
const cssnano = require('cssnano')({
	preset: 'default'
});

module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),
		// require('postcss-mixins'), // might be useful later
		require('tailwindcss')('./src/style/tailwind.config.js'),
		require('postcss-preset-env')({
			features: {
				'nesting-rules': true,
				'custom-media-queries': true
			}
		}),
		require('autoprefixer'),	
		...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
	],
};