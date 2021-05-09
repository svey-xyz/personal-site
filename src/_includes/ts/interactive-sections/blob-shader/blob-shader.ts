/*
* Blobby Shader
*/

import { shader } from "../shader-base";

const vertShader: String = require('./shaders/vert-Abstract.glsl');
const fragShader: String = require('./shaders/frag-Abstract.glsl');

export class blobShader extends shader {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	clock: THREE.Clock;
	uniforms: any;

	// Initializes the sketch
	constructor(container: Element) {
		super(container);

		this.uniforms = {
			u_time: {
				type: "f",
				value: 0.0
			},
			u_posSeed: {
				type: "v2",
				value: new (<any>window).THREE.Vector2(this.randomBetween(), this.randomBetween())
			}
		};

		super.initializeShader(this.uniforms, { vert: vertShader, frag: fragShader});
	}

	// Renders the sketch
	render() {
		super.render();
		this.uniforms.u_time.value = this.clock.getElapsedTime();
	}

	handleInput(e: Event) {
		super.handleInput(e);
		this.uniforms.u_posSeed.value.set(this.randomBetween(), this.randomBetween());
	}

	randomBetween(min = -100000, max = 100000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}