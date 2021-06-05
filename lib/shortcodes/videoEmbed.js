const videoProperties = require("../utils/content/videoProperties")

module.exports = (url) => {
	const video = videoProperties(url)

	const videoContainer =
		`<div class="video-embed-container z-10 absolute inset-0 hidden" data-embed-type="${video.type}" data-video-id="${video.ID}">
			<div id="${video.type}-container" class="absolute inset-0 z-10"></div>
		</div>`

	return videoContainer;
}