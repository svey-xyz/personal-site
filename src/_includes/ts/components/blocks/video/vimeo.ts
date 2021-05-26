// import * as Player from "@vimeo/player";
import Player from "@vimeo/player";
import { isPartiallyEmittedExpression } from "typescript";

let player:any
let overlay:HTMLElement

export const mount = (container: Element) => {
	var vimeoContainer = <HTMLElement>container.querySelector('.eleventy-plugin-vimeo-embed')!;
	overlay = <HTMLElement>container.querySelector('#video-overlay')!;
	player = new Player(vimeoContainer);

	player.on('play', function () {
		console.log('Played the video');
	});

	player.getVideoTitle().then(function (title:any) {
		console.log('title:', title);
	});

	overlay.addEventListener('click', playVideo);
}

function playVideo() {
	overlay.style.display = 'none';
	player.play()
}

function initializeVideo(container: Element): void {

	
}