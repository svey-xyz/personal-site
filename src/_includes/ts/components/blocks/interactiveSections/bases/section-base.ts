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
	loopActive: boolean = false

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: any, args?:{}) {
		container.parentElement.classList.add('loaded');

		// define universal section variables
		this.container = container;
		this.heightPercent = parseInt(container.parentElement.style.getPropertyValue('--section-height')!);
		this.setSize();

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);
		this.container.addEventListener('mousedown', this.inputHandler);

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', utils.domUtils.debounce(this.resizeHandler));
	}

	handleInput(e: Event): void { };
	resize(e: Event): void { };

	startLoop = (refreshRate: number = 0) => {
		this.cancel()
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
			this.requestTimeout(() => this.mainLoop(refreshRate), refreshRate, this.registerCancel);
			this.loop();
		}
	}

	noop = () => { };

	requestTimeout = (fn: () => void, delay: number, registerCancel: any) => {
		const start = new Date().getTime();

		const loop = () => {
			const delta = new Date().getTime() - start;

			if (delta >= delay) {
				fn();
				registerCancel(this.noop);
				return;
			}

			const raf = requestAnimationFrame(loop);
			registerCancel(() => cancelAnimationFrame(raf));
		};

		const raf = requestAnimationFrame(loop);
		registerCancel(() => cancelAnimationFrame(raf));
	};

	cancel = this.noop;
	registerCancel = (fn: () => void) => this.cancel = fn;

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
}

Section.prototype.handleInput = function (e: Event) {
	// Handle click
	// console.log(this.container, ` has been clicked`)
};

Section.prototype.resize = function (e: Event) {
	this.setSize()
};

