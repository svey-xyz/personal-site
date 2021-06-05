
// Cache busting
const fs = require("fs");
const path = require("path");

const scriptManifestPath = path.resolve(__dirname, "www", "assets", "js", "manifest.json");
const scriptManifest = process.env.NODE_ENV === 'production' ?
	JSON.parse(fs.readFileSync(scriptManifestPath, { encoding: "utf8" })) :
	{ "main.js": "/assets/js/main.js", "runtime.js": "/assets/js/runtime.js" }

const styleManifestPath = path.resolve(__dirname, "www", "assets", "css", "manifest.json");
const styleManifest = process.env.NODE_ENV === 'production' ?
	JSON.parse(fs.readFileSync(styleManifestPath, { encoding: "utf8" })) :
	{ "style.css": "style.css" }

module.exports = (bundleType) => {
	if (!scriptManifest["main.js"] || !scriptManifest["runtime.js"]) throw (new Error("Javascript bundle not found!"));
	if (!styleManifest["style.css"]) throw (new Error("Style bundle not found!"));

	if (bundleType === "CSS") return `<link rel="stylesheet" href="/assets/css/${styleManifest['style.css']}" />`;
	if (bundleType === "JS") return `<script src="${scriptManifest["main.js"]}"></script><script src="${scriptManifest["runtime.js"]}"></script>`;
}