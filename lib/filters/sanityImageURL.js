const Image = require("@11ty/eleventy-img");
const imageUrl = require('@sanity/image-url');

const client = require('../utils/sanity/sanityClient');

module.exports = (src) => {
	const builder = imageUrl(client)
	let url = builder.image(src).url();

	return url;
};