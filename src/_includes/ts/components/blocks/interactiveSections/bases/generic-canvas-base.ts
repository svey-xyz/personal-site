/*
* Shader Base Class for interactive shader sections
*/

import { Section } from "./section-base";

export class canvasBase extends Section {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D
	imagedata: ImageData

	constructor(container: Element) {
		super(container);

		// Initialize the WebGL renderer
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext("2d")!;

		this.setCanvasSize()

		this.imagedata = this.context.createImageData(this.sectionSize.width, this.sectionSize.height);

		// Add the renderer to the sketch container
		this.container.appendChild(this.canvas);
	}

	setCanvasSize(): void {
		this.canvas.width = this.sectionSize.width;
		this.canvas.height = this.sectionSize.height;

		this.imagedata = this.context.createImageData(this.sectionSize.width, this.sectionSize.height);
	}

	resize(e: Event): void {
		super.resize(e);
		this.setCanvasSize();
	}
}