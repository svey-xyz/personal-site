import { canvasBase } from "../bases/generic-canvas-base";
import { pixelData } from "./pixelData"

export const mount = (container: Element) => {
	new pixelMosaic(container);
}
export class pixelMosaic extends canvasBase {
	pixels: Map<number, pixelData> = new Map<number, pixelData>();
	averageWealth: number = 0;
	collectiveWealth: number = 0;

	constructor(container: Element) {
		super(container, {pixelScale: 32});

		this.initializeGrid();
		this.startLoop(60)

	}

	initializeGrid(): void {
		this.collectiveWealth = 0;
		this.pixels = new Map<number, pixelData>();

		let SEED = Math.random() * 10000;
		let noiseSize = 32;
		let wealthFrequency = ((this.canvasSize.width + this.canvasSize.height) / 2) / noiseSize;
		let influenceFrequency = ((this.canvasSize.width + this.canvasSize.height) / 2) / noiseSize / 10;


		for (var x = 0; x < this.canvasSize.width; x++) {
			for (var y = 0; y < this.canvasSize.height; y++) {
				let dx = x / this.canvasSize.width;
				let dy = y / this.canvasSize.height;

				let wealth: number = utils.mathUtils.map(utils.mathUtils.perlinNoise.get({ x: (dx * wealthFrequency) + SEED, y: (dy * wealthFrequency) + SEED}), -1, 1, 0, 1)
				let influence: number = utils.mathUtils.map(utils.mathUtils.perlinNoise.get({ x: (dx * influenceFrequency) + SEED * 3, y: (dy * influenceFrequency) + SEED * 3 }), -1, 1, 0, 1)
				this.collectiveWealth += wealth
				
				this.setPixel({ x: Math.floor(x), y: Math.floor(y) }, { wealth: wealth, influence: influence})
			}
		}

		this.averageWealth = this.collectiveWealth / (this.canvasSize.width * this.canvasSize.height)
	}

	setPixel(pos: position, args:{wealth:number, influence: number }) {
		let pixelIndex = utils.mathUtils.cartesianIndex(pos, this.canvasSize.width)
		let pixel: pixelData = this.pixels.get(pixelIndex) ? this.pixels.get(pixelIndex)! : new pixelData(this, pos, args);


		this.pixels.set(pixelIndex, pixel)
		this.setImagePixelData(this.imagedata, pixel.getPix)
	}

    // Create the image
    draw(): void {
		super.draw();
    }

	loop(): void {

		let economicSpeed = 4.5;
		let influenceAdjust = 1.6

		this.pixels.forEach((pix) => {
	
			let wealthChange: number = 0
			
			let neighbourCount = 0
			let neighbourWealthTotal = 0
			utils.mathUtils.cardinals.forEach(pos => {

				let neighbourPos = utils.mathUtils.addPos(pos, pix.getPos)
				let pixelIndex = utils.mathUtils.cartesianIndex(neighbourPos, this.canvasSize.width)
				let neighbour = this.pixels.get(pixelIndex)				

				if (neighbour) {
					neighbourCount++;
					neighbourWealthTotal += neighbour.getWealth

					if (pix.getWealth > this.averageWealth) {
						let maxChange = Math.min(pix.getWealth, neighbour.getWealth)
						wealthChange = utils.mathUtils.constrain(
							utils.mathUtils.rng((pix.getSurroundingWealth ? pix.getSurroundingWealth : 1) / 8, utils.mathUtils.percentDifference(neighbour!.getInfluence, pix.getInfluence)),
							0, maxChange) / economicSpeed
						pix.setInfluence = (pix.getInfluence * pix.getWealth) * influenceAdjust
					} else {
						let wealthSteal: number = 10 / (pix.getSurroundingWealth ? pix.getSurroundingWealth : 1)
						if (neighbour.getWealth > this.averageWealth) wealthSteal /= 10.0

						wealthChange = utils.mathUtils.rng(0, neighbour.getWealth / (wealthSteal * economicSpeed))
						pix.setInfluence = (pix.getInfluence * pix.getWealth) * (influenceAdjust)
					}

					// Must net 0 change
					pix.updateWealth(wealthChange)
					neighbour.updateWealth(-wealthChange)
				}

			});

			let neighbourWealthAverage = neighbourWealthTotal / neighbourCount
			pix.setSurroundingWealth = neighbourWealthAverage

		})
		this.draw()
	}

	resize(e: Event): void {
		super.resize(e);
		this.loopActive = false
		this.initializeGrid();
		this.loop(); // avoids flickering of missed loops
		this.loopActive = true;
	}

	handleInput(e: Event): void {
		super.handleInput(e)
		var loc = utils.domUtils.relativeLocation(this.paintCanvas, <MouseEvent>e)
		var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }
		let pixelIndex = utils.mathUtils.cartesianIndex(scaledLoc, this.canvasSize.width)

		let pix = this.pixels.get(pixelIndex)!

		if (pix.getWealth > this.averageWealth) {
			let wealthDiff = pix.getWealth - this.averageWealth / 2;

			pix.setInfluence = 0.0
			pix.setWealth = this.averageWealth / 2


			// this.collectiveWealth -= wealthDiff;
			// this.averageWealth = this.collectiveWealth / (this.canvasSize.width * this.canvasSize.height)
		} else {
			let wealthDiff = this.averageWealth * 1.5 - pix.getWealth;

			pix.setInfluence = 2.0
			pix.setWealth = this.averageWealth * 2.0

			console.log(`poor`)

			// this.collectiveWealth += wealthDiff
			// this.averageWealth = this.collectiveWealth / (this.canvasSize.width * this.canvasSize.height)
		}


	}
}