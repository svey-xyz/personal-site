
const cssnano = require('cssnano')({
	preset: 'default'
});

module.exports = {
	plugins: [
		require('postcss-import-ext-glob'),
		require('postcss-import'),
		require('tailwindcss')('./src/style/tailwind.config.js'),
		require('postcss-nesting'),
		require('autoprefixer'),	
		...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
	],
};