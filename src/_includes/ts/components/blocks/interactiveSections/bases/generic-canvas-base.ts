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

	paintCanvas: HTMLCanvasElement;
	paintContext: CanvasRenderingContext2D;

	imagedata: ImageData = new ImageData(1,1);
	pixelScale: number = 1;

	constructor(container: Element) {
		super(container);

		this.paintCanvas = document.createElement('canvas');
		this.paintContext = this.paintCanvas.getContext("2d")!;

		this.setCanvasSize();
		this.container.appendChild(this.paintCanvas);

		this.mainLoop();
	}

	loop(): void { }

	/**
	 * Used to draw elements to imagedata
	 *
	 * @memberof canvasBase
	 */
	draw(): void { 
		this.paintContext.putImageData(this.imagedata, 0, 0);
	}

	setPixelData(img: ImageData, pos: { x: number, y: number }, c: colour): void {
		var pixelindex = (pos.y * this.imagedata.width + pos.x) * 4;

		img.data[pixelindex] = c.r;     // Red
		img.data[pixelindex + 1] = c.g; // Green
		img.data[pixelindex + 2] = c.b;  // Blue
		img.data[pixelindex + 3] = (c.a) ? c.a : 255;   // Alpha
	}

	setCanvasSize(): void {
		this.paintCanvas.width = Math.ceil(this.sectionSize.width / this.pixelScale);
		this.paintCanvas.height = Math.ceil(this.sectionSize.height / this.pixelScale);

		this.imagedata = this.paintContext.createImageData(this.paintCanvas.width, this.paintCanvas.height);
		this.paintCanvas.style.transform = (`scale(${this.pixelScale})`)

		this.draw();

	}

	resize(e: Event): void {
		super.resize(e);
		this.setCanvasSize();
	}
	
	handleInput(e: Event) {
		super.handleInput(e);
	}
	
	setPixelScale(scale : number) {
		this.pixelScale = scale;
		this.setCanvasSize();
	}
	
}