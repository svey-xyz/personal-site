/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */

import { advancedBase } from "../../../../base/advancedBase";
export class InteractiveSection extends advancedBase {

	scriptContainer: HTMLElement
	resetButton: HTMLElement;

	heightPercent: number;
	sectionSize: { width: number, height: number } = { width: 0, height: 0 }

	constructor(container: HTMLElement, args?:{}) {
		super(container, args);
		// define universal section variables
		this.scriptContainer = this.container.querySelector(`.script-container`)!
		this.resetButton = this.container.querySelector(`#resetButton`)!;

		this.container.classList.add('loaded');

		this.heightPercent = parseInt(this.container.style.getPropertyValue('--section-height')!);
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
			utils.scriptUtils.requestTimeout(() => this.mainLoop(refreshRate), refreshRate);
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
		this.sectionSize.height = this.heightPercent * theme.getVH;
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}

	click(e: Event): void {
		super.click(e);
		if (e.target == this.resetButton) {
			console.log('click')
			this.init();
			return;
		}
	}
}

