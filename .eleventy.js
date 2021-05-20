const markdownify = require("./lib/filters/markdownfilter")
const embedEverything = require("eleventy-plugin-embed-everything");
// const sanity = require("./src/_data/sanity")
const slugify = require("slugify");

const serializers = require('./lib/utils/serializers')
const client = require('./lib/utils/sanityClient')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(embedEverything);

	// all the minify code is enabled when set to 'production'
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setWatchThrottleWaitTime(1000);

	eleventyConfig.setLibrary("md", markdownify.markdownLib);
	eleventyConfig.addFilter("markdownify", markdownify);

	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addTransform("htmlmin", require("./lib/transforms/htmlmin"))
	
	eleventyConfig.addPassthroughCopy({ 'node_modules/animejs/lib/anime.min.js': '/assets/js/libraries/anime.min.js' });
	eleventyConfig.addPassthroughCopy({ 'node_modules/three/build/three.min.js': '/assets/js/libraries/three.min.js' });

	// debugger
	eleventyConfig.addFilter("debugger", (...args) => {
		console.log(...args)
		debugger;
	});

	eleventyConfig.addFilter("sanityBlocksToMarkdown", (sanityBlcoks) => {
		return BlocksToMarkdown(sanityBlcoks, { serializers, ...client.config() })
	});

	// Overwrite 11ty built in slug filter to allow for backslashes to remain
	eleventyConfig.addFilter("slug", (input) => {
		const options = {
			replacement: "-",
			remove: /[&,+()$~%.'":*?<>{}]/g,
			lower: true
		};
		return slugify(input, options);
	});

	eleventyConfig.addWatchTarget("./src/style/**/*"); // need to fix this after moving config file

	eleventyConfig.addNunjucksShortcode("addScriptsToPage", function (scripts = []) {
		if (!this.page.scripts) this.page.scripts = [];
		this.page.scripts.push(...scripts);
		this.page.scripts = [...new Set(this.page.scripts)]; // removes duplicates
		console.log(this.page);
	});

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