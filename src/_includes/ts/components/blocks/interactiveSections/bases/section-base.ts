import { debounce } from "../../../../utilities/helpers";

/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */
export class Section {
	// containerName: string;
	container: HTMLElement;
	heightPercent: number;
	sectionSize: { width: number, height: number } = { width: 0, height: 0 }

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: any) {
		container.parentElement.classList.add('loaded');

		// define universal section variables
		this.container = container;
		this.heightPercent = parseInt(container.parentElement.style.getPropertyValue('--section-height')!);
		this.setSize();

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);
		this.container.addEventListener('mousedown', this.inputHandler);

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', debounce(this.resizeHandler));
	}

	handleInput(e: Event): void { };
	resize(e: Event): void { };

	/**
	 * Called to init the main loop. Override 'loop()' for logic.
	 *
	 * @memberof Section
	 */
	mainLoop = () => {
		requestAnimationFrame(this.mainLoop);
		this.loop();
	}

	/**
	 * Used for loop logic.
	 *
	 * @memberof Section
	 */
	loop(): void { }

	setSize(): void {
		this.sectionSize.height = this.heightPercent * global.vh;
		this.sectionSize.width = document.documentElement.clientWidth || document.body.clientWidth;
	}
}

Section.prototype.handleInput = function (e: Event) {
	// Handle click
	console.log(this.container, ` has been clicked`)
};

Section.prototype.resize = function (e: Event) {
	this.setSize()
};

