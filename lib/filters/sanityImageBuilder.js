const imageUrl = require('@sanity/image-url');

const client = require('../utils/sanity/sanityClient');

module.exports = (src, options = {}) => {
	const builder = imageUrl(client)
	let img = builder.image(src);

	return img;
};