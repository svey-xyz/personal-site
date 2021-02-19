const Image = require("@11ty/eleventy-img");

module.exports = (imagename, projectname, alt, classname, sizes) => {
	const fileloc = `/content/${projectname}/`;
	const src = `.${fileloc}${imagename}`;

	let options = {
		widths: [800],
		formats: ['png'],
		urlPath: fileloc,
		outputDir: "./www/" + fileloc
	};

	Image(src, options);

	// let metadata = await Image(src, {
	// 	widths: [800],
	// 	formats: ["png"],
	// 	urlPath: fileloc,
	// 	outputDir: "./www/" + fileloc
	// });

	let imageAttributes = {
		alt,
		sizes,
		class: classname,
		loading: "lazy",
		decoding: "async"
	};

	metadata = Image.statsSync(src, options);
	return Image.generateHTML(metadata, imageAttributes);

	// You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
	// return Image.generateHTML(metadata, imageAttributes);
}