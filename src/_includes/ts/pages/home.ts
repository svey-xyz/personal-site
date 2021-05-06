import { blobShader } from "../blocks/interactive-sections/blob-shader";
// const blobShader = require("../blocks/interactive-sections/blob-shader");


var sections = [];

window.onload = function () : void {
	initSections()
};

function initSections() : void {
	sections = [
		new blobShader('Section-1'),
		// new balls('Section-2'),
	];
}

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