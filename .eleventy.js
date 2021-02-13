const markdownify = require("./lib/filters/markdownfilter")

module.exports = (eleventyConfig) => {
	// all the minify code is enabled when set to 'production'
	process.env.ELEVENTY_ENV = 'development'

	eleventyConfig.setLibrary("md", markdownify.markdownLib);
	eleventyConfig.addNunjucksShortcode("markdown", markdownify);

	eleventyConfig.setDataDeepMerge(true);

	// Pass through and minify related config
	eleventyConfig.addNunjucksAsyncShortcode("image", require("./lib/filters/imagefilter"));

	eleventyConfig.addTransform("htmlmin", require("./lib/minifies/htmlmin"))
	eleventyConfig.addFilter("minify", require("./lib/minifies/minify"));
	
	eleventyConfig.addPassthroughCopy({ 'node_modules/animejs/lib/anime.min.js': '/assets/js/libraries/anime.min.js' });
	eleventyConfig.addPassthroughCopy({ 'node_modules/three/build/three.min.js': '/assets/js/libraries/three.min.js' });

	if (process.env.ELEVENTY_ENV != 'production') {
		eleventyConfig.addPassthroughCopy({'src/_includes/js/*': '/assets/js/'});
		eleventyConfig.addPassthroughCopy({ 'src/_includes/css/*': '/assets/css/' });
	}

	// debugger
	eleventyConfig.addFilter("debugger", (...args) => {
		console.log(...args)
		debugger;
	});

	// Glob
	eleventyConfig.addFilter("projectglob", require("./lib/filters/globfilter"));

	return {
		dir: {
			input: "src",
			output: "www"
		},
		// pathPrefix: "/subfolder/",
		templateFormats: ['md', 'njk', 'html'],
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk'
	};
};