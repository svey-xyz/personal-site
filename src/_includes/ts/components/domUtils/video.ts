/*
*  Dynamically load videos
*/
import * as Plyr from 'plyr';
import { advancedBase } from '../../base/advancedBase';

export const mount = (container: Element) => {
	new videoPlayer(<HTMLElement>container)
}

class videoPlayer extends advancedBase{
	playerContainer: HTMLElement
	embedType: string
	videoID: string
	player: any

	constructor(container: HTMLElement, args?: {}) {
		super(container, args);

		this.playerContainer = container.querySelector(`#player`)!;
		this.embedType = this.playerContainer.getAttribute('data-plyr-provider')!;
		this.videoID = this.playerContainer.getAttribute('data-plyr-embed-id')!;

		let options = {
			root: null, // defaults to browser viewport
			rootMargin: '0px',
			threshold: 0.0
		}

		let observer = new IntersectionObserver(this.intersect, options);
		observer.observe(this.playerContainer);
	}

	loadPlayer(playerContainer: HTMLElement) {
		if (this.player) return;
		this.player = new Plyr(playerContainer);
	}

	intersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				let playerContainer = <HTMLElement>entry.target!
				this.loadPlayer(playerContainer);
			}
		});
	}

	click(e: Event) {
		super.click(e);
		if (!this.player) this.loadPlayer;
	}
}