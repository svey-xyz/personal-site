import { base } from './base'

/**
 * Base for handling all interactive sections.
 *
 * @export
 * @class Section
 */
export class advancedBase extends base {
	loopActive: boolean = false
	timer: any
	touch: boolean = false
	ongoingTouches: Array<Touch> = []

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: HTMLElement, args?: {}) {
		super(container, args);

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);

		this.container.addEventListener('click', this.inputHandler);

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
	click(e: Event): void { };
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
}

advancedBase.prototype.handleInput = function (e: Event) {
	let touches: TouchList

	switch (e.type) {
		case ('click'):
			this.click(e);
			break;
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

advancedBase.prototype.resize = function (e: Event) {
};

