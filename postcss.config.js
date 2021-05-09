

module.exports = {
	// use: ["postcss-import"],
	// input: "./src/style/tailwind.css",
	// output: "./www/assets/css/style.css",
	// "postcss-import": {
	// 	onImport: function (sources) {
	// 		global.watchCSS(sources);
	// 	}
	// },
	// use: ["postcss-import"],
	// "postcss-import": {
	// 	onImport: function (sources) {
	// 		global.watchCSS(sources, this.from);
	// 	}
	// },
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