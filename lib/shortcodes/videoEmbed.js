const getURLProperties = require("../utils/content/videoProperties")
const fetch = require("../../node_modules/node-fetch/lib/index")


module.exports = async(videoProperties, pageData) => {
// import fetch from 'node-fetch';

	videoProperties = { ...videoProperties, ...getURLProperties(videoProperties.url) }

	if (!videoProperties.thumbnail) {
		const body = { a: 1 };
		const thumbWidth = 1280

		if (videoProperties.type == "youtube") videoProperties.thumbnailURL = `http://img.youtube.com/vi/${videoProperties.ID}/0.jpg`
		try {
			if (videoProperties.type == "vimeo") {
				const checkStatus = response => {
					if (response.ok) {
						// response.status >= 200 && response.status < 300
						return response;
					} else {
						throw new HTTPResponseError(response);
					}
				}

				const response = await fetch(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoProperties.ID}&width=${thumbWidth}`)

				try {
					checkStatus(response);
					let data = await response.json()
					videoProperties.thumbnailURL = data.thumbnail_url
				} catch (error) {
					console.error(error);

					const errorBody = await error.response.text();
					console.error(`Error body: ${errorBody}`);
				}
			}
		} catch (err) {
			throw err
		}
	}
	videoProperties.videoContainer =
		`<div id="${videoProperties.type}-container" data-embed-type="${videoProperties.type}" data-video-id="${videoProperties.ID}" class="absolute inset-0 z-10"></div>`

	pageData.videoProperties = videoProperties
	return videoProperties;
}

class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}