/*
* Shader Base Class for interactive shader sections
*/

import { Section } from "./section-base";
import * as THREE from 'three';

export class shader extends Section {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	clock: THREE.Clock;
	uniforms: any;

	vertShader: string = '';
	fragShader: string = '';

	// Initializes the sketch
	constructor(container: Element) {
		super(container);

		// Initialize the WebGL renderer
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.sectionSize.width, this.sectionSize.height);

		// Add the renderer to the sketch container
		this.container.appendChild(this.renderer.domElement);

		// Initialize the scene
		this.scene = new THREE.Scene();

		// Initialize the camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		this.clock = new THREE.Clock(true);
	}

	initializeShader(uniforms:any, shaders:any) {
		this.uniforms = uniforms;
		this.vertShader = shaders.vert;
		this.fragShader = shaders.frag;

		// Create the plane geometry
		var geometry = new THREE.PlaneBufferGeometry(2, 2);

		// Create the shader material
		var material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: this.vertShader,
			fragmentShader: this.fragShader,
			// fragmentShader: document.getElementById("fragmentShader")!.textContent!
		});

		// Create the mesh and add it to the scene
		var mesh = new THREE.Mesh(geometry, material);
		this.scene.add(mesh);
		this.animate();
	}

	// Animates the sketch
	animate = () => {
		requestAnimationFrame(this.animate);
		this.render();
	}

	// Renders the sketch
	render() {
		this.renderer.render(this.scene, this.camera);
	}

	resize(e: Event) {
		super.resize(e)
		this.renderer.setSize(this.sectionSize.width, this.sectionSize.height);
	}

	handleInput(e: Event) {
		super.handleInput(e);
	}
}