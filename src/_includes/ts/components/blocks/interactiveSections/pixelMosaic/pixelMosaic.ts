import { canvasBase } from "../bases/generic-canvas-base";
import { relativeLocation } from "../../../../utilities/relativeLocationClick";
import * as fct from "../../../../utilities/mathHelpers"

export const mount = (container: Element) => {
	new pixelMosaic(container);
}
class pixelMosaic extends canvasBase{
	pixels:Map<position, colour> = new Map<position, colour>();
	constructor(container: Element) {
		super(container);

		this.setPixelScale(25);

		for (var x = 0; x < this.imagedata.width; x++) {
			for (var y = 0; y < this.imagedata.height; y++) {
				let pos = { x: x, y: y }

				let noise = fct.PerlinNoise(pos, 0.2, 3)
				let r = fct.constrain(fct.rng(175, 255) * noise, 0, 255)
				let g = fct.constrain(fct.rng(10, 120) * noise, 0, 255)
				let b = fct.constrain(fct.rng(110, 200) * noise, 0, 255)
				this.pixels.set(pos, { r: r, g: g, b: b })
				console.log(`Noise: ${noise}`)
				this.setPixelData(this.imagedata, pos, {r:r,g:g,b:b})
			}
		}

		this.draw()

	}

    // Create the image
    draw(): void {
		super.draw();
    }

	handleInput(e: Event): void {
		super.handleInput(e)
		var loc = relativeLocation(this.paintCanvas, <MouseEvent>e)
		var scaledLoc = { x: Math.floor(loc.x / this.pixelScale), y: Math.floor(loc.y / this.pixelScale) }
		this.setPixelData(this.imagedata, scaledLoc, { r: 0, g: 0, b: 0 })
	

		this.draw();

		console.log('Scaled Loc: ', scaledLoc)
	}
}