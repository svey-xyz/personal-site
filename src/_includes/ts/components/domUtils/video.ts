/*
*  Dynamically load videos
*/

let overlay: HTMLElement
let videoContainer: HTMLElement
let playerContainer: HTMLElement
let embedType: string
let videoID: string

export const mount = (container: Element) => {
	videoContainer = <HTMLElement>container.querySelector('.video-embed-container')!;
	overlay = <HTMLElement>container.querySelector('#video-overlay')!;

	embedType = videoContainer.getAttribute('data-embed-type')!;
	videoID = videoContainer.getAttribute('data-video-id')!;

	playerContainer = <HTMLElement>videoContainer.querySelector(`#${embedType}-container`);

	loadScript();
}

async function loadScript() {

	overlay.addEventListener('mouseover', loadVideo);
	overlay.addEventListener('click', playVideo);

	function playVideo() {

	}

	function loadVideo() {
	
	}
}