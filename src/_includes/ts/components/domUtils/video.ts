/*
*  Dynamically load videos
*/

let player: any
let overlay: HTMLElement
let button: HTMLElement
let videoContainer: HTMLElement
let playerContainer: HTMLElement
let embedType: string
let videoID: string

let vimeoOptions = {
	id: 0,
	loop: false,
	dnt: true
};

export const mount = (container: Element) => {
	videoContainer = <HTMLElement>container.querySelector('.video-embed-container')!;
	overlay = <HTMLElement>container.querySelector('#video-overlay')!;
	button = <HTMLElement>overlay.querySelector('.video-overlay-button')!;

	embedType = videoContainer.getAttribute('data-embed-type')!;
	videoID = videoContainer.getAttribute('data-video-id')!;
	vimeoOptions.id = parseInt(videoID);

	playerContainer = <HTMLElement>videoContainer.querySelector(`#${embedType}-container`);

	loadScript();
}

async function loadScript() {
	let VimeoPlayer: any;
	let YouTubePlayer: any;

	embedType === 'vimeo' ?
		{ default: VimeoPlayer } = await import("@vimeo/player") :
		{ default: YouTubePlayer} = await import('youtube-player')

	overlay.addEventListener('mouseover', loadVideo);
	overlay.addEventListener('click', playVideo);

	function playVideo() {
		if (!player) loadVideo();

		button.style.display = 'none';
		videoContainer.style.display = 'block';

		try {
			embedType === 'vimeo' ? player.play() : player.playVideo()
		} catch (err) {
			console.log('video not played: ', err)
		}
	}

	function loadVideo() {
		if (player) return;
		try {
			player = embedType === 'vimeo' ?
				new VimeoPlayer(<HTMLElement>videoContainer.querySelector(`#${embedType}-container`), vimeoOptions) :
				YouTubePlayer(<HTMLElement>videoContainer.querySelector('#youtube-container'));

			if (embedType === 'youtube') player.loadVideoById(videoID);
		} catch (err) {
			console.log('Player not loaded: ', err)
		}

		player.ready().then(function () {
			console.log('player succesfully loaded')
		});
	}
}

