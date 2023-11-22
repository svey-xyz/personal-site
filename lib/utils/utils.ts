import { colourUtils } from "./colourUtils";
import { mathUtils } from './mathUtils'
import { domUtils } from './domUtils'
import { scriptUtils } from './scriptUtils'


export type position = {
	x: number,
	y: number,
	z?: number
}

export type colour = {
	r: number,
	g: number,
	b: number,
	a?: number
}

export type pixel = {
	pos: position,
	col: colour
}

/**
 * Utilities Class
 *
 * @export
 * @class utils
 */
class utils {
	private colourUtilsStore: colourUtils | undefined
	private mathUtilsStore: mathUtils | undefined
	private domUtilsStore: domUtils | undefined
	private scriptUtilsStore: scriptUtils | undefined

	constructor() {
	}

	/**
	 * Utilities for scripts.
	 *
	 * @readonly
	 * @type {scriptUtils}
	 * @memberof utils
	 */
	public get scriptUtils(): scriptUtils {
		return this.scriptUtilsStore ? this.scriptUtilsStore : this.scriptUtilsStore = new scriptUtils()
	}

	/**
	 * Utilities for interacting with the DOM.
	 *
	 * @readonly
	 * @type {domUtils}
	 * @memberof utils
	 */
	public get domUtils(): domUtils {
		return this.domUtilsStore ? this.domUtilsStore : this.domUtilsStore = new domUtils()
	}

	/**
	 * Utilities for generic math functions
	 *
	 * @readonly
	 * @type {mathUtils}
	 * @memberof utils
	 */
	public get mathUtils(): mathUtils {
		return this.mathUtilsStore ? this.mathUtilsStore : this.mathUtilsStore = new mathUtils()
	}

	/**
	 * Utilities for manipulating colour objects
	 *
	 * @readonly
	 * @type {colourUtils}
	 * @memberof utils
	 */
	public get colourUtils(): colourUtils {
		return this.colourUtilsStore ? this.colourUtilsStore : this.colourUtilsStore = new colourUtils()
	}
}

export const Utils = new utils()
