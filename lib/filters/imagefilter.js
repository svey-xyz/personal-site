const Image = require("@11ty/eleventy-img");

module.exports = async(src, projectname, alt, sizes) => {
	const fileloc = "/content/" + projectname + "/";

	let metadata = await Image(src, {
		widths: [800],
		formats: ["png"],
		urlPath: fileloc,
		outputDir: "./www/" + fileloc
	});

	let imageAttributes = {
		alt,
		sizes,
		class: "project-img",
		loading: "lazy",
		decoding: "async"
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}