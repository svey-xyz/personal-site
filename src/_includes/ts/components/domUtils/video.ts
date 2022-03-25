/*
*  Dynamically load videos
*/
import * as Plyr from 'plyr';

export const mount = (container: Element) => {
	new videoPlayer(<HTMLElement>container)
}

class videoPlayer {
	playerContainer: HTMLElement
	embedType: string
	videoID: string
	player: any

	constructor(container: HTMLElement) {
		this.playerContainer = container.querySelector(`#player`)!;
		this.embedType = this.playerContainer.getAttribute('data-plyr-provider')!;
		this.videoID = this.playerContainer.getAttribute('data-plyr-embed-id')!;

		let options = {
			root: null, // defaults to browser viewport
			rootMargin: '0px',
			threshold: 1.0
		}

		let observer = new IntersectionObserver(this.intersect, options);
		observer.observe(this.playerContainer);
	}

	loadPlayer(playerContainer: HTMLElement) {
		if (this.player) return;
		this.player = new Plyr(playerContainer);
		console.log(`Loaded: `, this.player)
	}

	intersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				let playerContainer = <HTMLElement>entry.target!
				this.loadPlayer(playerContainer);
			}
		});
	}
}