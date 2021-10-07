const Image = require("@11ty/eleventy-img");
const imageUrl = require('@sanity/image-url');

const client = require('../utils/sanity/sanityClient');

module.exports = async (src, cls, alt, sizes, widths) => {
	const builder = imageUrl(client)
	let url = builder.image(src).url();

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

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return html;
};