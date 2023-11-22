import { Utils } from '../utils/utils'

/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */

import { advancedBase } from "./advancedBase";
export class InteractiveSection extends advancedBase {

	scriptContainer: HTMLElement

	sectionSize: { width: number, height: number } = { width: 0, height: 0 }

	constructor(container: HTMLElement, args?: {}) {
		super(container, args);
		// define universal section variables
		this.scriptContainer = this.container

		this.container.classList.add('loaded');

		this.setSize();
	}

	startLoop = (refreshRate: number = 0) => {
		// this.cancel()
		this.loopActive = true
		this.mainLoop(refreshRate);

	}

	/**
	 * Called to init the main loop. Override 'loop()' for logic.
	 *
	 * @memberof Section
	 */
	mainLoop = (refreshRate: number = 0) => {
		if (this.loopActive) {
			Utils.scriptUtils.requestTimeout(() => this.mainLoop(refreshRate), refreshRate);
			this.loop();
		}
	}

	/**
	 * Used for loop logic.
	 *
	 * @memberof Section
	 */
	loop(): void { }

	setSize(): void {
		this.sectionSize.height = this.container.offsetHeight
		// console.log(`huh`, this.sectionSize)
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}

	resize(e: Event): void {
		this.setSize();
	}

	click(e: Event): void {
		super.click(e);
	}
}