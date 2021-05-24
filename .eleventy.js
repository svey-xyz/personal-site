
// Content modification tools
const slugify = require("slugify");
const markdownify = require("./lib/filters/markdownfilter")
const embedEverything = require("eleventy-plugin-embed-everything");

// Sanity tools
const serializers = require('./lib/utils/serializers')
const client = require('./lib/utils/sanityClient')
const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const sanityImage = require('eleventy-plugin-sanity-image');

// Cache busting
const fs = require("fs");
const path = require("path");

const scriptManifestPath = path.resolve(__dirname, "www", "assets", "js", "manifest.json");
const scriptManifest = process.env.NODE_ENV === 'production' ?
	JSON.parse(fs.readFileSync(scriptManifestPath, { encoding: "utf8" })) :
	{ "main.js" : "/assets/js/main.js", "runtime.js" : "/assets/js/runtime.js" }

const styleManifestPath = path.resolve(__dirname, "www", "assets", "css", "manifest.json");
const styleManifest = process.env.NODE_ENV === 'production' ?
	JSON.parse(fs.readFileSync(styleManifestPath, { encoding: "utf8" })) :
	{ "style.css": "style.css" }

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(embedEverything);

	// all the minify code is enabled when set to 'production'
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setWatchThrottleWaitTime(1000);

	eleventyConfig.setLibrary("md", markdownify.markdownLib);
	eleventyConfig.addFilter("markdownify", markdownify);

	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addTransform("htmlmin", require("./lib/transforms/htmlmin"))

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

	eleventyConfig.addWatchTarget("./src/style/**/*"); // doesn't work with eleventy config not at root

	eleventyConfig.addShortcode("bundledJS", function () {
		if (!scriptManifest["main.js"] || !scriptManifest["runtime.js"]) {
			console.log("Javascript bundle not found!")
			throw ("Javascript bundle not found!");
		};
		return `<script src="${scriptManifest["main.js"]}"></script><script src="${scriptManifest["runtime.js"]}"></script>`;
	});

	eleventyConfig.addShortcode("bundledCSS", function () {
		if (!styleManifest["style.css"]) {
			console.log("Style bundle not found!")
			throw ("Style bundle not found!");
		};
		
		return `<link rel="stylesheet" href="/assets/css/${styleManifest['style.css']}">`;
	});

	eleventyConfig.addPlugin(sanityImage, {
		client: client
	})

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