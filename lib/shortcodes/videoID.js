const videoProperties = require("../utils/content/videoProperties")

module.exports = (url) => {
	return videoProperties(url).ID;
}