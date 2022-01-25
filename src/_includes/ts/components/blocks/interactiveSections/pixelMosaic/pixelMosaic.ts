import { canvasBase } from "../bases/generic-canvas-base";
import { relativeLocation } from "../../../../utilities/relativeLocationClick";
import { mosaicPixel } from  './pixel'

// import { makeNoise2D } from 'fast-simplex-noise'

export const mount = (container: Element) => {
	new pixelMosaic(container);
}
class pixelMosaic extends canvasBase {
	pixels: Map<position, mosaicPixel> = new Map<position, mosaicPixel>();
	pixelColour: colour = global.utils.hexConverter(global.primaryAccent);

	averageWealth: number = 0;
	collectiveWealth: number = 0;

	// noisefunc = makeNoise2D.call(Math.random)

	constructor(container: Element) {
		super(container, {pixelScale: 25});

		this.initializeGrid();

		this.draw();
	}

	initializeGrid(): void {
		let SEED = 10070;
		let noiseSize = 15;
		let frequency = ((this.canvasSize.width + this.canvasSize.height) / 2) / noiseSize;

		for (var x = 0; x < this.canvasSize.width; x++) {
			for (var y = 0; y < this.canvasSize.height; y++) {
				let pos:position = { x: x, y: y }

				let dx = x / this.canvasSize.width;
				let dy = y / this.canvasSize.height;

				let wealth: number = fct.map(fct.perlinNoise.get({x: (dx * frequency) + SEED, y: (dy * frequency) + SEED}), -1, 1, 0, 1)

				this.collectiveWealth += wealth

				let tempCol:colour = { r: this.pixelColour.r, g: this.pixelColour.g, b: this.pixelColour.b, a: 255 * wealth }
				let pix: pixel = { pos: pos, col: tempCol}
				let mPix: mosaicPixel = new mosaicPixel(pix, wealth, wealth);

				this.pixels.set(pos, mPix)
				this.setPixelData(this.imagedata, pix)
			}
		}

		this.averageWealth = this.collectiveWealth / (this.canvasSize.width * this.canvasSize.height)


	}

    // Create the image
    draw(): void {
		super.draw();
    }

	loop(): void {
		super.loop();

		// this.collectiveWealth = 0;

		// let i = 1;
		// this.pixels.forEach((pix, index) => {
		// 	this.pixelUpdate(pix)
 
		// 	i++;
		// });
	}

	pixelUpdate(pix: mosaicPixel): void {
		let survival = fct.constrain((fct.map(pix.influence, 0, 1, 1, 0) + fct.map(pix.wealth, 0, 1, 1, 0)) / 2, 0, 1);
		let radius = ((pix.influence + fct.constrain(pix.wealth, 0.1, 0.5)) + 1);

		//update pixel influence - affects pixel's ability to steal wealth
		let changeInfluence = () => {
		}
	}

	// generateCol(wealth: number): colour {
	// 	let r = fct.constrain(fct.rng(175, 255) * noise, 0, 255)
	// 	let g = fct.constrain(fct.rng(10, 120) * noise, 0, 255)
	// 	let b = fct.constrain(fct.rng(110, 200) * noise, 0, 255)

	// 	return { r: r, g: g, b: b }
	// }

	handleInput(e: Event): void {
		super.handleInput(e)
		var loc = relativeLocation(this.paintCanvas, <MouseEvent>e)
		var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }
		let pix: pixel = { pos: scaledLoc, col: { r: 0, g: 0, b: 0, a: 0 } }

		this.setPixelData(this.imagedata, pix)
	
		this.draw();
	}
}