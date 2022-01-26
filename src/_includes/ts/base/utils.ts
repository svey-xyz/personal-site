import { colourUtils } from "../utilities/colourUtils";
import { mathUtils } from '../utilities/mathUtils'
import { domUtils } from '../utilities/domUtils'

/**
 * Utilities Class
 *
 * @export
 * @class utils
 */
export class utils {
	private colourUtilsStore: colourUtils | undefined
	private mathUtilsStore: mathUtils | undefined
	private domUtilsStore: domUtils | undefined


	constructor() {
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