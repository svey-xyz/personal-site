import { pixelMosaic } from "./pixelMosaic";

/**
 *
 * Used to store data for each pixel in the mosaic
 * @class pixelData
 */
export class pixelData {
	private pixelColour: colour = theme.secondaryAccent;

	private pix: pixel = {pos:{x:0,y:0},col:{r:0,g:0,b:0}}

	private intensity: number
	private influence: number
	private surroundingIntensity: number | undefined

	private mosaic: pixelMosaic

	//iniate and define things
	constructor(mosaic: pixelMosaic, pos: position, args: { intensity: number }) {
		this.mosaic = mosaic
		this.intensity = args.intensity;
		this.influence = args.intensity + utils.mathUtils.rng(0, 0.5);

		this.pix = { pos: pos, col: this.updateCol() };
		this.mosaic.setImagePixelData(this.mosaic.imagedata, this.pix)

	}

	public updateCol(): colour {
		// let intensityDiff = utils.mathUtils.percentDifference(this.mosaic.averageIntensity, this.intensity)
		let pixCol = utils.colourUtils.colourShift(this.pixelColour, theme.primaryAccent, 1.0 - utils.mathUtils.constrain(this.intensity, 0, 1))
		pixCol = utils.colourUtils.colourNoise(pixCol, (1.0 - utils.mathUtils.constrain(this.intensity, 0, 1)) * 50)

		pixCol.a = utils.mathUtils.map(utils.mathUtils.constrain(this.intensity * 255, 0, 255), 0, 255, 255, 20)

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
		this.intensity = utils.mathUtils.constrain(intensity, 0.1, 1)
		this.updateCol()
	}

	public get getInfluence(): number {
		return this.influence
	}

	public set setInfluence(influence: number) {
		this.influence = utils.mathUtils.constrain(influence, 0.1, 1)
	}


	public get getSurroundingIntensity(): number | undefined {
		return this.surroundingIntensity
	}

	public set setSurroundingIntensity(surroundingIntensity: number) {
		this.surroundingIntensity = utils.mathUtils.constrain(surroundingIntensity, 0.1, 1)
	}
}