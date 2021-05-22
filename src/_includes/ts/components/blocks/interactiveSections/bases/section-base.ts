export class Section {
	// containerName: string;
	container: HTMLElement;
	heightPercent: number;
	height: number;

	inputHandler: (e: Event) => void;
	resizeHandler: (e: Event) => void;

	constructor(container: any) {
		// define universal section variables
		this.container = container;
		this.heightPercent = parseInt(this.container.getAttribute('data-sectionheight')!);
		this.height = this.heightPercent * global.vh;

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);
		this.container.addEventListener('mousedown', this.inputHandler);

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', this.resizeHandler);
	}

	handleInput(e: Event): void { };
	resize(e: Event): void { };
}

Section.prototype.handleInput = function (e: Event) {
	// Handle click
	console.log(`${this.container} has been clicked`)
};

Section.prototype.resize = function (e: Event) {
	this.height = this.heightPercent * global.vh;
};

