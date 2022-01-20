/*
* Shader Base Class for interactive shader sections
*/

import { Section } from "./section-base";
import { relativeLocation } from "../../../../utilities/relativeLocationClick";

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

	setCanvasSize(): void {
		this.paintCanvas.width = this.sectionSize.width / this.pixelScale;
		this.paintCanvas.height = this.sectionSize.height / this.pixelScale;

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
		var loc = relativeLocation(this.paintCanvas, <MouseEvent>e)
		var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }

		var pixelindex = (scaledLoc.y * this.imagedata.width + scaledLoc.x) * 4;
		this.imagedata.data[pixelindex] = 0;     // Red
		this.imagedata.data[pixelindex + 1] = 0; // Green
		this.imagedata.data[pixelindex + 2] = 0;  // Blue
		this.imagedata.data[pixelindex + 3] = 255;   // Alpha

		this.draw();

		console.log('Scaled Loc: ', scaledLoc)
	}
	
	setPixelScale(scale : number) {
		this.pixelScale = scale;
		this.setCanvasSize();
	}
	
}