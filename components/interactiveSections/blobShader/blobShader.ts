/*
* Blobby Shader
*/
import { shader } from "../shaderBase";
import { Utils, colour } from '@/lib/utils'

import * as THREE from 'three';

const vertShader: String = require('../blobShader/shaders/vert-Abstract.glsl');
const fragShader: String = require('../blobShader/shaders/frag-Abstract.glsl');

export const mountBlobs = (container: Element) => {
	new blobShader(<HTMLElement>container!);
}

class blobShader extends shader {
	uniforms: any;
	computedRGB: Array<string>;
	rgbBg: colour;
	period: number = 8
	amplitude: number = 2

	// Initializes the sketch
	constructor(container: HTMLElement) {
		super(container);
		this.computedRGB = (window.getComputedStyle(this.container).getPropertyValue('--secondary-accent')).split(` `)
		this.rgbBg = {
			r: Number(this.computedRGB[0]),
			g: Number(this.computedRGB[1]),
			b: Number(this.computedRGB[2]),
		} as colour

		this.uniforms = {
			u_time: {
				type: "f",
				value: 0.0
			},
			u_posSeed: {
				type: "v2",
				value: new THREE.Vector2(this.randomBetween(), this.randomBetween())
			},
			u_bgColour: {
				type: "v3",
				value: new THREE.Vector3(this.rgbBg.r / 255, this.rgbBg.g / 255, this.rgbBg.b / 255)
			}
		};

		super.initializeShader(this.uniforms, { vert: vertShader, frag: fragShader });
		// this.render();

	}

	init() {
		super.init();
		this.uniforms.u_posSeed.value.set(this.randomBetween(), this.randomBetween());

	}

	// Renders the sketch
	render() {
		super.render();

		this.uniforms.u_time.value = Math.cos(this.clock.getElapsedTime() / this.period) * this.amplitude;

		this.uniforms.u_bgColour.value = new THREE.Vector3(this.rgbBg.r / 255, this.rgbBg.g / 255, this.rgbBg.b / 255);
	}

	touchStart(e: Event): void {
		super.touchStart(e);
	}

	randomBetween(min = 0, max = 100000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}