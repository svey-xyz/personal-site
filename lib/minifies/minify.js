const extname = require("path").extname;
const fs = require('fs'); 

const jsmin = require("./jsmin");
const cssmin = require("./cssmin");

const inPath = "src/_includes/"

//bad

module.exports = (source) => {
	var writePath = "/assets/" + source;
	
	if (process.env.ELEVENTY_ENV == "production") {
		var sourcePath = inPath + source;
		var path = writePath.split('/');
		var name = path[path.length - 1]

		path = writePath.split(name)[0]
		name = name.split('.')[0] + '.min.' + name.split('.')[1];

		writePath = path + name;

		minify(sourcePath, path, name);
	}
	
	return writePath;	
}

function minify(sourcePath, path, name) {
	fs.readFile(sourcePath, 'utf8', async function (err, data) {
		if (err) throw err;

		var minifiedContent

		const ext = extname(sourcePath);
		switch (ext) {
			case ".js":
				minifiedContent = await jsmin(data, sourcePath);
				break
			case ".css":
				minifiedContent = await cssmin(data, sourcePath);
				break
			default:
				minifiedContent = data;
		}

		writeFile(path, name, minifiedContent);
	});
};

async function writeFile(path, name, minifiedContent) {
	fs.mkdir('www/' + path, { recursive: true }, (err) => {
		if (err) return console.log(err);

		fs.writeFile('www/' + path + name, minifiedContent, (err) => {
			if (err) return console.log(err);
		});
	});
}
