import { blobShader } from "../interactive-sections/blob-shader";
let ineractiveScripts = { 'blobShader' : blobShader }
// const blobShader = require("../blocks/interactive-sections/blob-shader");


var sections = [];

window.onload = function () : void {
	initSections();
};

function initSections() : void {
	var interactiveSections = document.getElementsByClassName('interactive-section');
	for (var i = 0; i < interactiveSections.length; ++i) {
		var scriptType = interactiveSections[i].children[0].getAttribute('interactivescript');
		sections.push(new ineractiveScripts[scriptType](interactiveSections[i].children[0]));

	}
	// sections = [
	// 	new blobShader('Section-1'),
	// 	// new balls('Section-2'),
	// ];
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