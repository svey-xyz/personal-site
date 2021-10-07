
const markdownify = require("./lib/filters/markdownfilter")
const blocksToMD = require("./lib/shortcodes/blocksToMD")
const betterSlugs = require("./lib/filters/betterSlugs")
const videoEmbed = require("./lib/shortcodes/videoEmbed")
const videoID = require("./lib/shortcodes/videoID")
const matchingPorjects = require("./lib/shortcodes/matchingProjects")
const imageCache = require("./lib/shortcodes/imageCache")
const bundlePointer = require("./lib/shortcodes/bundlePointer")
const emailSplitter = require("./lib/shortcodes/emailSplitter")


module.exports = (eleventyConfig) => {
	eleventyConfig.setQuietMode(true);
	eleventyConfig.setWatchThrottleWaitTime(1000);
	
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.addTransform("htmlmin", require("./lib/transforms/htmlmin"))

	// debugger
	eleventyConfig.addFilter("debugger", (...args) => {
		console.log(...args)
		debugger;
	});

	eleventyConfig.setLibrary("md", markdownify.markdownLib);
	eleventyConfig.addFilter("markdownify", markdownify);

	eleventyConfig.addFilter("slug", betterSlugs);
	eleventyConfig.addFilter("sanityBlocksToMarkdown", blocksToMD);

	eleventyConfig.addFilter("emailSplitter", emailSplitter);

	eleventyConfig.addShortcode("getMatchingProjects", matchingPorjects);

	eleventyConfig.addNunjucksAsyncShortcode("image", imageCache);

	eleventyConfig.addShortcode("videoEmbed", videoEmbed);
	eleventyConfig.addShortcode("videoID", videoID);

	eleventyConfig.addShortcode("bundlePointer", bundlePointer);

	eleventyConfig.addPassthroughCopy({ "./src/_includes/assets/robots.txt": "robots.txt" });

	eleventyConfig.addWatchTarget("./src/style/**/*"); // doesn't work with eleventy config not at root

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