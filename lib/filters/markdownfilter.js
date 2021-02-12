const markdownIt = require("markdown-it");
const emoji = require('markdown-it-emoji');
const twemoji = require('twemoji')

let markdownLib

let options = {
	html: true,
	breaks: true,
	linkify: true,
	typographer: true
};

module.exports = (markdownString) => {	
	return markdownLib.render(markdownString)	;
}

module.exports.markdownLib = (function () {
	markdownLib = markdownIt(options).disable('code').use(emoji);

	markdownLib.renderer.rules.emoji = function (token, idx) {
		return twemoji.parse(token[idx].content);
	};

	return markdownLib;
})();