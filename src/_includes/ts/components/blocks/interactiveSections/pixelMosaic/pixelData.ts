import { pixelMosaic } from "./pixelMosaic";

/**
 *
 * Used to store data for each pixel in the mosaic
 * @class pixelData
 */
export class pixelData {
	private pixelColour: colour = theme.secondaryAccent;

	private pix: pixel = {pos:{x:0,y:0},col:{r:0,g:0,b:0}}

	private wealth: number
	private influence: number
	private surroundingWealth: number | undefined

	private mosaic: pixelMosaic

	//iniate and define things
	constructor(mosaic: pixelMosaic, pos: position, args: { wealth: number, influence: number }) {
		this.mosaic = mosaic
		this.wealth = args.wealth;
		this.influence = args.influence;

		this.pix = { pos: pos, col: this.updateCol() };

	}

	public updateWealth(wealthChange: number): void {
		this.wealth += wealthChange
		this.updateCol()
	}

	public updateCol(): colour {
		let pixCol = utils.colourUtils.colourShift(this.pixelColour, theme.primaryAccent, 1.0 - utils.mathUtils.constrain(this.wealth, 0, 1))
		pixCol = utils.colourUtils.colourNoise(pixCol, (1.0 - utils.mathUtils.constrain(this.wealth, 0, 1)) * 50)

		pixCol.a = utils.mathUtils.map(utils.mathUtils.constrain(this.wealth * 255, 0, 255), 0, 255, 255, 20)

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

	public get getWealth(): number {
		return this.wealth
	}

	public set setWealth(wealth: number) {
		this.wealth = utils.mathUtils.constrain(wealth, 0.1, 1)
	}

	public get getInfluence(): number {
		return this.influence
	}

	public set setInfluence(influence: number) {
		this.influence = utils.mathUtils.constrain(influence, 0.1, 1)
	}


	public get getSurroundingWealth(): number | undefined {
		return this.surroundingWealth
	}

	public set setSurroundingWealth(surroundingWealth: number) {
		this.surroundingWealth = surroundingWealth, 0.1, 1
	}
}