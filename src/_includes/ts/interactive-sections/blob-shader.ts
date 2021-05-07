/*
* Section-1 Canvas
*/

import { Section } from "../blocks/interactive-section";

export class blobShader extends Section {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	clock: THREE.Clock;
	uniforms: any;

	// Initializes the sketch
	constructor(container: any) {
		super(container);

		// Initialize the WebGL renderer
		this.renderer = new (<any>window).THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, this.height);

		// Add the renderer to the sketch container
		this.container.appendChild(this.renderer.domElement);

		// Initialize the scene
		this.scene = new (<any>window).THREE.Scene();

		// Initialize the camera
		this.camera = new (<any>window).THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		this.clock = new (<any>window).THREE.Clock(true);

		// Create the plane geometry
		var geometry = new (<any>window).THREE.PlaneBufferGeometry(2, 2);

		// Define the shader uniforms
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

		// Create the shader material
		var material = new (<any>window).THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: document.getElementById("vertexShader")!.textContent!,
			fragmentShader: document.getElementById("fragmentShader")!.textContent!
		});

		// Create the mesh and add it to the scene
		var mesh = new (<any>window).THREE.Mesh(geometry, material);
		this.scene.add(mesh);
		this.animate();
		// self = this;
	}

	// Animates the sketch
	animate = () => {
		requestAnimationFrame(this.animate);
		this.render();
	}

	// Renders the sketch
	render() {
		this.uniforms.u_time.value = this.clock.getElapsedTime();
		this.renderer.render(this.scene, this.camera);
	}

	resize(e: Event) {
		super.resize(e)
		this.renderer.setSize(window.innerWidth, this.height);
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