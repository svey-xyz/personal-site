import { canvasBase } from "../bases/generic-canvas-base";

export const mount = (container: Element) => {
	new pixelMosaic(container);
}

class pixelMosaic extends canvasBase{
	constructor(container: Element) {
		super(container);
		this.createImage(0)
		this.context.putImageData(this.imagedata, 0, 0);
	}

	resize(e: Event): void {
		super.resize(e);
		this.createImage(0)
		this.context.putImageData(this.imagedata, 0, 0);
	}

    // Create the image
    createImage(offset:number) {
        // Loop over all of the pixels
        for (var x=0; x<this.canvas.width; x++) {
			for (var y = 0; y < this.canvas.height; y++) {
                // Get the pixel index
				var pixelindex = (y * this.canvas.width + x) * 4;
 
                // Generate a xor pattern with some random noise
                var red = ((x+offset) % 256) ^ ((y+offset) % 256);
                var green = ((2*x+offset) % 256) ^ ((2*y+offset) % 256);
                var blue = 50 + Math.floor(Math.random()*100);
 
                // Rotate the colors
                blue = (blue + offset) % 256;
 
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