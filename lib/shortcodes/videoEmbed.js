const getURLProperties = require("../utils/content/videoProperties")
const fetch = require("node-fetch")
const imageCache = require("./imageCache")
const sanityImageURL = require("../filters/sanityImageURL")


module.exports = async(videoProperties, pageData) => {
	videoProperties = { ...videoProperties, ...getURLProperties(videoProperties.url) }

	await setData(videoProperties)

	videoProperties.videoContainer =
		`<a id="videoOverlay" onclick="('customElements' in window) && event.preventDefault()" title="Play Video" rel="noreferrer" target="_blank" href="${videoProperties.url }"
		class="group flex cursor-pointer absolute inset-0 overflow-hidden items-center justify-center z-10 bg-contain"
		style="background-image: url(${videoProperties.thumbnailURL});">
		<i id="button" class="z-10 fas fa-play-circle text-white !text-[80px] md:text-[100px] transform duration-200 group-hover:scale-125"></i>
		</a>

		<div id="player" data-plyr-provider="${videoProperties.type}" data-plyr-embed-id="${videoProperties.ID}"
		data-plyr-config='{ "title": "${videoProperties.title}" }' class="absolute inset-0">
		</div>
		`

	// pageData.videoProperties = videoProperties
	return videoProperties.videoContainer;
}

async function setData(videoProperties) {
	const thumbWidth = 1280
	let data
	let thumbnailURL = {}

	if (videoProperties.thumbnail) thumbnailURL = sanityImageURL(videoProperties.thumbnail)


	switch (videoProperties.type) {
		case "youtube":
			data = (await catchGET(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoProperties.ID}&key=${process.env.YOUTUBEAPIKEY}`)).items[0].snippet
			if (!videoProperties.thumbnail) thumbnailURL = data.thumbnails.maxres.url
			if (!videoProperties.title) videoProperties.title = data.localized.title

			break;
		case "vimeo":
			data = await catchGET(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoProperties.ID}&width=${thumbWidth}`)
			if (!videoProperties.thumbnail) thumbnailURL = data.thumbnail_url
			if (!videoProperties.title) videoProperties.title = title
			break;
		default:
			return;
	}

	videoProperties.thumbnailURL = (await imageCache(thumbnailURL, '', '', '100%', [thumbWidth], true)).jpeg[0].url
	
}

async function catchGET(fetchString) {
	try {
		const checkStatus = response => {
			if (response.ok) {
				// response.status >= 200 && response.status < 300
				return response;
			} else {
				throw new HTTPResponseError(response);
			}
		}

		const response = await fetch(fetchString)

		try {
			checkStatus(response);
			let data = await response.json()
			return data
		} catch (error) {
			console.error(error);
			const errorBody = await error.response.text();
			console.error(`Error body: ${errorBody}`);
		}
	} catch (err) {
		throw err
	}
}

class HTTPResponseError extends Error {
	constructor(response, ...args) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
		this.response = response;
	}
}