import { SphereBufferGeometry } from "three";
import { canvasBase } from "../bases/generic-canvas-base";

export const mount = (container: Element) => {
	new pixelMosaic(container);
}

class pixelMosaic extends canvasBase{
	offset: number = 0
	constructor(container: Element) {
		super(container);
		this.draw()
		this.context.putImageData(this.imagedata, 0, 0);
	}

    // Create the image
    draw(): void {
		super.draw();
        // Loop over all of the pixels
        for (var x=0; x<this.canvas.width; x++) {
			for (var y = 0; y < this.canvas.height; y++) {
                // Get the pixel index
				var pixelindex = (y * this.canvas.width + x) * 4;
 
                // Generate a xor pattern with some random noise
                var red = ((x+this.offset) % 256) ^ ((y+this.offset) % 256);
                var green = ((2*x+this.offset) % 256) ^ ((2*y+this.offset) % 256);
                var blue = 50 + Math.floor(Math.random()*100);
 
                // Rotate the colors
                blue = (blue + this.offset) % 256;
 
                // Set the pixel data
                this.imagedata.data[pixelindex] = red;     // Red
                this.imagedata.data[pixelindex+1] = green; // Green
				this.imagedata.data[pixelindex+2] = blue;  // Blue
				this.imagedata.data[pixelindex+3] = 255;   // Alpha
            }
        }
    }
 
    // // Main loop
    // function main(tframe) {
    //     // Request animation frames
    //     window.requestAnimationFrame(main);
 
    //     // Create the image
    //     createImage(Math.floor(tframe / 10));
 
    //     // Draw the image data to the canvas
    //     context.putImageData(imagedata, 0, 0);
    // }
 
    // // Call the main loop
    // main(0);
}