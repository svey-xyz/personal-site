import { canvasBase } from "../bases/canvasBase";
import { pixelData } from "./pixelData"

export const mount = (container: Element) => {
	new pixelMosaic(<HTMLElement>container!);
}
export class pixelMosaic extends canvasBase {
	pixels: Map<number, pixelData> = new Map<number, pixelData>();
	averageIntensity: number = 0;
	collectiveIntensity: number = 0;
	economicSpeed = 24.5;

	constructor(container: HTMLElement) {
		super(container, {pixelScale: 32});

		this.init();
		this.startLoop(60)

	}

	init(): void {
		super.init();
		this.collectiveIntensity = 0;
		this.pixels = new Map<number, pixelData>();

		let SEED = Math.random() * 10000;
		let noiseSize = 32;
		let intensityFrequency = ((this.canvasSize.width + this.canvasSize.height) / 2) / noiseSize;


		for (var x = 0; x < this.canvasSize.width; x++) {
			for (var y = 0; y < this.canvasSize.height; y++) {
				let dx = x / this.canvasSize.width;
				let dy = y / this.canvasSize.height;

				let intensity: number = utils.mathUtils.map(utils.mathUtils.perlinNoise.get({ x: (dx * intensityFrequency) + SEED, y: (dy * intensityFrequency) + SEED}), -1, 1, 0, 1);
				this.collectiveIntensity += intensity
				
				this.setPixel({ x: Math.floor(x), y: Math.floor(y) }, { intensity: intensity })
			}
		}

		this.averageIntensity = this.collectiveIntensity / (this.canvasSize.width * this.canvasSize.height)
	}

	setPixel(pos: position, args: { intensity:number }) {
		let pixelIndex = utils.mathUtils.cartesianIndex(pos, this.canvasSize.width)
		let pixel: pixelData = this.pixels.get(pixelIndex) ? this.pixels.get(pixelIndex)! : new pixelData(this, pos, args);


		this.pixels.set(pixelIndex, pixel)
	}

    // Create the image
    draw(): void {
		super.draw();
    }

	loop(): void {
		this.pixels.forEach((pix) => {

			let surroundingIntensity = (pix.getSurroundingIntensity ? pix.getSurroundingIntensity : this.averageIntensity)
			pix.setInfluence = ((surroundingIntensity + pix.getIntensity) / 2)
	
			let intensityChange: number = 0
			
			let neighbourCount = 0
			let neighbourIntensityTotal = 0
			utils.mathUtils.cardinals.forEach(pos => {

				let neighbourPos = utils.mathUtils.addPos(pos, pix.getPos)
				let pixelIndex = utils.mathUtils.cartesianIndex(neighbourPos, this.canvasSize.width)
				let neighbour = this.pixels.get(pixelIndex)				

				if (neighbour) {
					neighbourCount++;
					neighbourIntensityTotal += neighbour.getIntensity

					let influenceDiff = utils.mathUtils.percentDifference(pix.getInfluence, neighbour!.getInfluence) * 1.333;

					intensityChange = utils.mathUtils.rng(0, influenceDiff) / this.economicSpeed
					intensityChange = (neighbour.getIntensity - intensityChange) >= 0 ? intensityChange : neighbour.getIntensity

					// Must net 0 change
					pix.setIntensity = pix.getIntensity + intensityChange
					neighbour.setIntensity = neighbour.getIntensity - intensityChange

				}

			});

			pix.setSurroundingIntensity = neighbourIntensityTotal / neighbourCount

		})
		this.draw()
	}

	resize(e: Event): void {
		if (theme.vh != theme.ogVH) {
			super.resize(e);

			this.loopActive = false
			this.init();
			this.loop(); // avoids flickering of missed loops
			this.loopActive = true;
		}
	}

	touchMove(e: Event): void {
		super.touchMove(e)
		e.preventDefault();
		
		if (this.touch) {
			var loc = utils.domUtils.relativeLocation(this.paintCanvas, <MouseEvent>e)
			var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }
			let pixelIndex = utils.mathUtils.cartesianIndex(scaledLoc, this.canvasSize.width)

			let pix = this.pixels.get(pixelIndex)!
			let intensityDiff = 1.0 - pix.getIntensity

			pix.setInfluence = 1.0
			pix.setIntensity = 1.0

			this.collectiveIntensity += intensityDiff
			this.averageIntensity = this.collectiveIntensity / (this.canvasSize.width * this.canvasSize.height)
		}
	}
}