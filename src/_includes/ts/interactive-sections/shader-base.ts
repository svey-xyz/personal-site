/*
* Shader Base Class for interactive shader sections
*/

import { Section } from "./section-base";

export class shader extends Section {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	clock: THREE.Clock;
	uniforms: any;

	vertShader: String = '';
	fragShader: String = '';

	// Initializes the sketch
	constructor(container: Element) {
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
	}

	initializeShader(uniforms:any, shaders:any) {
		this.uniforms = uniforms;
		this.vertShader = shaders.vert;
		this.fragShader = shaders.frag;

		// Create the plane geometry
		var geometry = new (<any>window).THREE.PlaneBufferGeometry(2, 2);

		// Create the shader material
		var material = new (<any>window).THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: this.vertShader,
			fragmentShader: this.fragShader,
			// fragmentShader: document.getElementById("fragmentShader")!.textContent!
		});

		// Create the mesh and add it to the scene
		var mesh = new (<any>window).THREE.Mesh(geometry, material);
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
		this.renderer.setSize(window.innerWidth, this.height);
	}

	handleInput(e: Event) {
		super.handleInput(e);
	}
}