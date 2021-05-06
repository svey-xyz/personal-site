module.exports = {
	"browserslist": [">0.3%", "not ie 11", "not dead", "not op_mini all"],
	plugins: [
		require('tailwindcss')('./src/style/tailwind.config.js'),
		require('autoprefixer'),
		require('cssnano')({
			preset: 'default',
		}),
	],
};