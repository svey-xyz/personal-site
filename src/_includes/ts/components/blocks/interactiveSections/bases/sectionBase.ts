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
	timer: any
	touch: boolean = false
	ongoingTouches: Array<Touch> = []

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
		this.container.addEventListener('mouseup', this.inputHandler);
		this.container.addEventListener('mousemove', this.inputHandler);
		this.container.addEventListener('touchstart', this.inputHandler);
		this.container.addEventListener('touchend', this.inputHandler);

		this.container.addEventListener('touchmove', this.inputHandler);



		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', utils.domUtils.debounce(this.resizeHandler));
	}

	handleInput(e: Event): void { };
	holdTouch(e: Event): void { };
	touchMove(e: Event): void { };
	touchStart(e: Event): void {
		this.timer = setInterval(() => {
			this.holdTouch(e)
		}, 100);
		this.touch = true;
	}
	touchEnd(e: Event) {
		if (this.timer) clearInterval(this.timer)
		this.touch = false;
	}




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
	let touches: TouchList
	e.preventDefault()

	switch(e.type) {
		case ('mousedown'):
			this.touchStart(e);
			break;

		case ('touchstart'):
			touches = (<TouchEvent>e).changedTouches;
			for (var i = 0; i < touches.length; i++) {
				this.ongoingTouches.push(<Touch>utils.domUtils.copyObj(touches[i]));
			}
			this.touchStart(e)
			break;

		case ('mouseup' || 'touchend'):
			this.touchEnd(e);
			break;

		case ('touchend'):
			touches = (<TouchEvent>e).changedTouches;

			for (var i = 0; i < touches.length; i++) {
				var idx = utils.domUtils.ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);
				if (idx >= 0) this.ongoingTouches.splice(idx, 1);
			}
			this.touchEnd(e);
			break;

		case ('mousemove'):
			this.touchMove(e);
			break;

		case ('touchmove'):
			touches = (<TouchEvent>e).changedTouches;

			for (var i = 0; i < touches.length; i++) {
				var idx = utils.domUtils.ongoingTouchIndexById(touches[i].identifier, this.ongoingTouches);

				if (idx >= 0) this.ongoingTouches.splice(idx, 1, <Touch>utils.domUtils.copyObj(touches[i]));  // swap in the new touch record
			}
			this.touchMove(e);
			break;

		default:
			break;
	}

};

Section.prototype.resize = function (e: Event) {
	this.setSize()
};

