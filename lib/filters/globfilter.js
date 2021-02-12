const fg = require('fast-glob');

module.exports = (projectname) => {
	const folder = './src/projects/' + projectname + '/content/*';
	const glob = fg.sync([folder], { objectMode: true });

	for (file in glob) {
		var namesplit = glob[file].name.split(".");

		glob[file].filename = namesplit[0];
		glob[file].filetype = namesplit[1];
	}

	return glob;
}