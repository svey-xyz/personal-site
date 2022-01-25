export class mosaicPixel {

	pix: pixel

	wealth: number
	influence: number
	survival: number

    //iniate and define things
	constructor(pix: pixel, wealth: number, influence: number) {
		this.pix = pix;

        this.wealth = wealth;
        this.influence = influence;
		this.survival = 1
    }
}