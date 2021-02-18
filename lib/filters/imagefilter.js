const Image = require("@11ty/eleventy-img");

module.exports = async(imagename, projectname, alt, classname, sizes) => {
	const fileloc = `/content/${projectname}/`;
	const src = `.${fileloc}${imagename}`;

	let metadata = await Image(src, {
		widths: [800],
		formats: ["png"],
		urlPath: fileloc,
		outputDir: "./www/" + fileloc
	});

	let imageAttributes = {
		alt,
		sizes,
		class: classname,
		loading: "lazy",
		decoding: "async"
	};

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	return Image.generateHTML(metadata, imageAttributes);
}