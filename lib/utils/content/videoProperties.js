module.exports = (url) => {
	const vimeoIDPattern = /(?:https?:\/\/)?(?:w{3}\.)?(?:vimeo\.com)\/(\d+)(?:\S*)/
	const youtubeIDPattern = /(?:https?:\/\/)?(?:w{3}\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([A-Za-z0-9-_]{11})(?:\S*)/;

	let vimeoMatch = vimeoIDPattern.exec(url)
	let youtubeMatch = youtubeIDPattern.exec(url)

	if (!vimeoMatch && !youtubeMatch) throw (new Error(`Video URL does not match any accepted embeds! Affected URL: ${url}`));
	let embedType = vimeoMatch ? 'vimeo' : 'youtube';
	let embed = vimeoMatch ? vimeoMatch : youtubeMatch;

	let video = {
		'type': embedType,
		'ID': embed[1]
	}

	return video;
}