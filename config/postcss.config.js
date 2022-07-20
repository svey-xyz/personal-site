const cssnano = require('cssnano')({
	preset: 'default'
});
const csshash = require('postcss-hash')({
	algorithm: 'sha256',
	trim: 20,
	manifest: './www/assets/css/manifest.json'
})

module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),
		// require('postcss-mixins'), // might be useful later
		require('postcss-custom-media'),
		require('tailwindcss/nesting')(require('postcss-nesting')),
		require('tailwindcss')('./src/style/tailwind.config.js'),
		// require('postcss-preset-env')({
		// 	features: {
		// 		'nesting-rules': true,
		// 		'custom-media-queries': true
		// 	}
		// }),
		require('autoprefixer'),	
		...(process.env.NODE_ENV === 'production' ? [cssnano, csshash] : []),
	],
};