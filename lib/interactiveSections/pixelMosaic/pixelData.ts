import { colour, pixel, position, Utils } from "../../utils";
import { pixelMosaic } from "./pixelMosaic";

/**
 *
 * Used to store data for each pixel in the mosaic
 * @class pixelData
 */
export class pixelData {
	private tempCol: colour = Utils.colourUtils.hexConverter(window.getComputedStyle(document.body).getPropertyValue('--secondary-accent'))
	private pixelColour: colour = this.tempCol

	private pix: pixel = { pos: { x: 0, y: 0 }, col: { r: 0, g: 0, b: 0 } }

	private intensity: number
	private influence: number
	private surroundingIntensity: number | undefined

	private mosaic: pixelMosaic

	//iniate and define things
	constructor(mosaic: pixelMosaic, pos: position, args: { intensity: number }) {
		this.mosaic = mosaic
		this.intensity = args.intensity;
		this.influence = args.intensity + Utils.mathUtils.rng(0, 0.5);

		this.pix = { pos: pos, col: this.updateCol() };
		this.mosaic.setImagePixelData(this.mosaic.imagedata, this.pix)

	}

	public updateCol(): colour {
		// let intensityDiff = Utils.mathUtils.percentDifference(this.mosaic.averageIntensity, this.intensity)
		let pixCol = Utils.colourUtils.colourShift(this.pixelColour, this.tempCol, 1.0 - Utils.mathUtils.constrain(this.intensity, 0, 1))
		pixCol = Utils.colourUtils.colourNoise(pixCol, (1.0 - Utils.mathUtils.constrain(this.intensity, 0, 1)) * 50)

		pixCol.a = Utils.mathUtils.map(Utils.mathUtils.constrain(this.intensity * 255, 0, 255), 0, 255, 255, 20)

		this.pix.col = pixCol;
		this.mosaic.setImagePixelData(this.mosaic.imagedata, this.pix)

		return this.pix.col;
	}


	public get getPix(): pixel {
		return this.pix
	}

	public get getPos(): position {
		return this.pix.pos
	}

	public get getIntensity(): number {
		return this.intensity
	}

	public set setIntensity(intensity: number) {
		this.intensity = Utils.mathUtils.constrain(intensity, 0.1, 1)
		this.updateCol()
	}

	public get getInfluence(): number {
		return this.influence
	}

	public set setInfluence(influence: number) {
		this.influence = Utils.mathUtils.constrain(influence, 0.1, 1)
	}


	public get getSurroundingIntensity(): number | undefined {
		return this.surroundingIntensity
	}

	public set setSurroundingIntensity(surroundingIntensity: number) {
		this.surroundingIntensity = Utils.mathUtils.constrain(surroundingIntensity, 0.1, 1)
	}
}