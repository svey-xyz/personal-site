/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */
export class Section {
	// containerName: string;
	containerParent: HTMLElement
	container: HTMLElement;
	resetButton: HTMLElement;

	heightPercent: number;
	sectionSize: { width: number, height: number } = { width: 0, height: 0 }
	loopActive: boolean = false
	timer: any
	touch: boolean = false
	ongoingTouches: Array<Touch> = []

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: Element, args?:{}) {
		
		// define universal section variables
		this.container = (<HTMLElement>container);
		this.containerParent = this.container.parentElement ? this.container.parentElement : this.container;
		this.resetButton = this.containerParent.querySelector(`#resetButton`)!;

		this.containerParent.classList.add('loaded');

		this.heightPercent = parseInt(this.containerParent.style.getPropertyValue('--section-height')!);
		this.setSize();

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);
		this.resetButton.addEventListener('click', this.inputHandler);

		this.container.addEventListener('mousedown', this.inputHandler);
		this.container.addEventListener('mouseup', this.inputHandler);
		this.container.addEventListener('mouseleave', this.inputHandler);
		this.container.addEventListener('mouseenter', this.inputHandler);

		this.container.addEventListener('mousemove', this.inputHandler);
		this.container.addEventListener('touchstart', this.inputHandler);
		this.container.addEventListener('touchend', this.inputHandler);

		this.container.addEventListener('touchmove', this.inputHandler);

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', utils.domUtils.debounce(this.resizeHandler));
	}

	init(): void { }
	handleInput(e: Event): void { };
	holdTouch(e: Event): void { };
	touchMove(e: Event): void { };
	touchStart(e: Event): void {
		if (e.target == this.resetButton) console.log('reset clciked')

		this.timer = setInterval(() => {
			this.holdTouch(e)
		}, 100);
		this.touch = true;
	}
	touchEnd(e: Event) {
		// console.log(e.target)

		if (this.timer) clearInterval(this.timer)
		this.touch = false;
	}

	resize(e: Event): void { };

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
}

Section.prototype.handleInput = function (e: Event) {
	let touches: TouchList
	// e.preventDefault()

	if (e.target == this.resetButton && (e.type == 'click')) {
		this.init();
		return;
	}

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

		case ('mouseup'):
			this.touchEnd(e);
			break;
		case ('mouseleave'):
			this.touchEnd(e);
			break;

		case ('mouseenter'):
			if ((<MouseEvent>e).buttons > 0) this.touchStart(e);
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

