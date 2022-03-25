const Image = require("@11ty/eleventy-img");
module.exports = async (url, cls, alt, sizes, widths, returnData = false) => {

	let options = {
		widths: widths,
		formats: ["svg", "webp", "jpeg"],
		outputDir: "./www/assets/img/",
		urlPath: "/assets/img/",
		// svgShortCircuit: true,
		filenameFormat: function (id, src, width, format) { // and options
			return `${id}-${width}.${format}`;
		},
		cacheOptions: {
			duration: "4w",
			directory: "./cache/img",
			removeUrlQueryParams: false,
		},
		sharpWebpOptions: {
			quality: 75,
			alphaQuality: 100,
			smartSubsample: true,
			reductionEffort: 6
		}
	}

	let metadata = await Image(url, options);

	let imageAttributes = {
		class: cls,
		alt,
		sizes,
		loading: "lazy",
		decoding: "async",
	};

	let html = Image.generateHTML(metadata, imageAttributes);

	if (returnData) return metadata;
	return html;
};