/*
* Shader Base Class for interactive shader sections
*/

import { Section } from "./section-base";

/**
 * Base for interactive sections using a canvas.
 *
 * @export
 * @class canvasBase
 * @extends {Section}
 */
export class canvasBase extends Section {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D
	imagedata: ImageData
	pixelScale: number = 1

	constructor(container: Element) {
		super(container);

		// Initialize the WebGL renderer
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext("2d")!;

		this.setCanvasSize()

		this.imagedata = this.context.createImageData(this.sectionSize.width / this.pixelScale, this.sectionSize.height / this.pixelScale);

		// Add the renderer to the sketch container
		this.container.appendChild(this.canvas);

		this.mainLoop();
	}

	loop(): void {
		// this.imagedata = this.context.createImageData(this.sectionSize.width, this.sectionSize.height);
		// this.context.putImageData(this.imagedata, 0, 0);
	}

	/**
	 * Used to draw elements to imagedata
	 *
	 * @memberof canvasBase
	 */
	draw(): void { }

	setCanvasSize(): void {
		this.canvas.width = this.sectionSize.width;
		this.canvas.height = this.sectionSize.height;

		this.imagedata = this.context.createImageData(this.sectionSize.width, this.sectionSize.height);
	}

	resize(e: Event): void {
		super.resize(e);
		this.setCanvasSize();

		// Redraw since imagedata has been reset
		this.draw();
		this.context.putImageData(this.imagedata, 0, 0);
	}
}