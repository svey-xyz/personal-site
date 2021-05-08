import { blobShader } from "../interactive-sections/blob-shader/blob-shader";

(<any>window).interactiveScripts = { 'blob-shader' : blobShader };

require("../blocks/interactive-section");

// class balls extends Section {

// 	constructor(containerName:string) {
// 		super(containerName);
// 	}

// 	resize(e:Event) {
// 		super.resize(e);
// 		console.log(`${this.containerName} has been resized to ${this.height}`)
// 	}

// 	handleInput(e:Event) { 
// 		super.handleInput(e);
// 		console.log(this)
// 	}
// }