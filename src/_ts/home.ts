var sections = [];

window.onload = function () : void {
	initSections()
};

function initSections() : void {
	sections = [
		new blob('Section-1'),
		new balls('Section-2'),
	];
}
class Section {
	containerName : string;
	container : HTMLElement;
	heightPercent : number;
	height : number;

	inputHandler : (e: Event) => void;
	resizeHandler : (e: Event) => void;

	constructor(containerName:string) {
		// define universal section variables
		this.containerName = containerName;
		this.container = document.getElementById(containerName)!;
		this.heightPercent = parseInt(this.container.getAttribute('sectionheight')!);
		this.height = this.heightPercent * vh;

		// initialize listeners
		this.inputHandler = this.handleInput.bind(this);
		this.container.addEventListener('mousedown', this.inputHandler);

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', this.resizeHandler);
	}

	handleInput(e:Event): void {};
	resize(e: Event): void {};
}

Section.prototype.handleInput = function (e:Event) {
	// Handle click
	// console.log(`${this.containerName} has been clicked`)
};

Section.prototype.resize = function (e:Event) {
	this.height = this.heightPercent * vh;
};

class balls extends Section {

	constructor(containerName:string) {
		super(containerName);
	}

	resize(e:Event) {
		super.resize(e);
		console.log(`${this.containerName} has been resized to ${this.height}`)
	}

	handleInput(e:Event) { 
		super.handleInput(e);
		console.log(this)
	}
}

/*
* Section-1 Canvas
*/

class blob extends Section {
	renderer : THREE.WebGLRenderer;
	scene : THREE.Scene;
	camera : THREE.OrthographicCamera;
	clock : THREE.Clock;
	uniforms: any;

	// Initializes the sketch
	constructor(containerName:string) {
		super(containerName);

		// Initialize the WebGL renderer
		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, this.height);

		// Add the renderer to the sketch container
		this.container.appendChild(this.renderer.domElement);	

		// Initialize the scene
		this.scene = new THREE.Scene();

		// Initialize the camera
		this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		this.clock = new THREE.Clock(true);

		// Create the plane geometry
		var geometry = new THREE.PlaneBufferGeometry(2, 2);

		// Define the shader uniforms
		this.uniforms = {
			u_time: {
				type: "f",
				value: 0.0
			},
			u_posSeed: {
				type: "v2",
				value: new THREE.Vector2(this.randomBetween(), this.randomBetween())
			}
		};

		// Create the shader material
		var material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: document.getElementById("vertexShader")!.textContent!,
			fragmentShader: document.getElementById("fragmentShader")!.textContent!
		});

		// Create the mesh and add it to the scene
		var mesh = new THREE.Mesh(geometry, material);
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

	resize(e:Event) {
		super.resize(e)
		this.renderer.setSize(window.innerWidth, this.height);
	}

	handleInput(e:Event) {
		super.handleInput(e);
		this.uniforms.u_posSeed.value.set(this.randomBetween(), this.randomBetween());
	}

	randomBetween(min = -100000, max = 100000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}