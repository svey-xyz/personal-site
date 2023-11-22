import { colour, Utils } from "./utils";

/**
 * 
 *
 * @export
 * @class colourUtils
 */
export class colourUtils {
	constructor() {
	}

	/**
	 * Returns a Colour object from a Hex string.
	 *
	 * @param {string} hex
	 * @return {*}  {colour}
	 * @memberof colourUtils
	 */
	hexConverter(hex: string): colour {
		let r: number, g: number, b: number;

		hex = hex.replace(/\s/g, '')

		if (hex.charAt(0) == '#') {
			hex = hex.substr(1);
		}
		if (hex.length == 3) {
			hex = hex.substr(0, 1) + hex.substr(0, 1) + hex.substr(1, 2) + hex.substr(1, 2) + hex.substr(2, 3) + hex.substr(2, 3);
		}
		r = parseInt((hex.charAt(0) + hex.charAt(1)), 16);
		g = parseInt((hex.charAt(2) + hex.charAt(3)), 16);
		b = parseInt((hex.charAt(4) + hex.charAt(5)), 16);
		return { r, g, b };
	}

	colourNoise(baseCol: colour, sD: number): colour {
		let r = Utils.mathUtils.constrain(Utils.mathUtils.randomGaussian(sD, baseCol.r), 0, 255)
		let g = Utils.mathUtils.constrain(Utils.mathUtils.randomGaussian(sD, baseCol.g), 0, 255)
		let b = Utils.mathUtils.constrain(Utils.mathUtils.randomGaussian(sD, baseCol.b), 0, 255)
		let a = baseCol.a ? baseCol.a! : 255;

		return { r, g, b, a }
	}

	/**
	 *
	 *
	 * @param {colour} col1
	 * @param {colour} col2
	 * @param {number} shift
	 * Shift amount 0-1
	 * @return {*}  {colour}
	 * @memberof colourUtils
	 */
	colourShift(col1: colour, col2: colour, shift: number): colour {
		let r = col1.r * (1 - shift) + col2.r * shift;
		let g = col1.g * (1 - shift) + col2.g * shift;
		let b = col1.b * (1 - shift) + col2.b * shift;

		let a1 = col1.a ? col1.a! : 255;
		let a2 = col2.a ? col2.a! : 255;
		let a = a1 * (1 - shift) + a2 * shift;

		return { r, g, b, a }
	}
}