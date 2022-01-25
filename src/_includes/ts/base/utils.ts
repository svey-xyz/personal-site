import { colourUtils } from "../utilities/colourUtils";
import { mathUtils } from '../utilities/mathUtils'
import { domUtils } from '../utilities/domUtils'




export class utils {
	colourUtilsStore: colourUtils | undefined
	mathUtilsStore: mathUtils | undefined
	domUtilsStore: domUtils | undefined


	constructor() {
	}

	public get domUtils(): domUtils {
		return this.domUtilsStore ? this.domUtilsStore : this.domUtilsStore = new domUtils()
	}
	
	public get mathUtils(): mathUtils {
		return this.mathUtilsStore ? this.mathUtilsStore : this.mathUtilsStore = new mathUtils()
	}
	
	public get colourUtils(): colourUtils {
		return this.colourUtilsStore ? this.colourUtilsStore : this.colourUtilsStore = new colourUtils()
	}
}