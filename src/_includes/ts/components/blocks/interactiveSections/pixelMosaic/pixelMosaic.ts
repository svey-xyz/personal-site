import { canvasBase } from "../bases/generic-canvas-base";

export const mount = (container: Element) => {
	new pixelMosaic(container);
}
class pixelMosaic extends canvasBase {
	pixels: Map<position, pixelData> = new Map<position, pixelData>();
	pixelColour: colour = theme.primaryAccent;

	averageWealth: number = 0;
	collectiveWealth: number = 0;

	constructor(container: Element) {
		super(container, {pixelScale: 25});

		this.initializeGrid();
	}

	initializeGrid(): void {
		let SEED = Math.random() * 10000;
		let noiseSize = 15;
		let frequency = ((this.canvasSize.width + this.canvasSize.height) / 2) / noiseSize;

		for (var x = 0; x < this.canvasSize.width; x++) {
			for (var y = 0; y < this.canvasSize.height; y++) {
				let dx = x / this.canvasSize.width;
				let dy = y / this.canvasSize.height;

				let wealth: number = utils.mathUtils.map(utils.mathUtils.perlinNoise.get({x: (dx * frequency) + SEED, y: (dy * frequency) + SEED}), -1, 1, 0, 1)
				this.collectiveWealth += wealth
				
				this.setPixel({ x: x, y: y }, {wealth:wealth})
			}
		}

		this.averageWealth = this.collectiveWealth / (this.canvasSize.width * this.canvasSize.height)
		this.draw();

	}

	setPixel(pos: position, args:{wealth:number}) {

		let pixel = this.pixels.get(pos)
		let pix: pixel

		if (pixel) {
			pix = pixel.getPix
		} else {
			let pixCol = utils.colourUtils.colourShift(this.pixelColour, theme.secondaryAccent, 0.8 - args.wealth)
			pixCol = utils.colourUtils.colourNoise(pixCol, args.wealth * 50)

			pixCol.a = args.wealth * 255

			pix = { pos: pos, col: pixCol}
			pixel = new pixelData(pix, args);
		}

		this.pixels.set(pos, pixel)
		this.setImagePixelData(this.imagedata, pix)
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

	resize(e: Event): void {
		super.resize(e);
		this.initializeGrid();
	}

	pixelUpdate(pix: pixelData): void {
		// let survival = utils.mathUtils.constrain((utils.mathUtils.map(pix.influence, 0, 1, 1, 0) + utils.mathUtils.map(pix.wealth, 0, 1, 1, 0)) / 2, 0, 1);
		// let radius = ((pix.influence + utils.mathUtils.constrain(pix.wealth, 0.1, 0.5)) + 1);

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
		var loc = utils.domUtils.relativeLocation(this.paintCanvas, <MouseEvent>e)
		var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }
		let pix: pixel = { pos: scaledLoc, col: { r: 0, g: 0, b: 0, a: 0 } }

		this.setImagePixelData(this.imagedata, pix)
	
		this.draw();
	}
}

/**
 *
 * Used to store data for each pixel in the mosaic
 * @class pixelData
 */
class pixelData {

	pix: pixel

	wealth: number | undefined
	influence: number | undefined
	survival: number

	//iniate and define things
	constructor(pix: pixel, args:{wealth?: number, influence?: number}) {
		this.pix = pix;

		this.wealth = args.wealth;
		this.influence = args.influence;
		this.survival = 1
	}

	
	public get getPix() : pixel {
		return this.pix
	}
	
}