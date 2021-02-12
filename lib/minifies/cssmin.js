const minify = require("clean-css");

module.exports = async (content, outputPath) => {
	return new minify({}).minify(content).styles;
};