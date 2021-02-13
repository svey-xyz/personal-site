var wH;
var sections = [];

window.onload = function () {
	initSections()
};

function initSections() {
	// sections = [
	// 	// new Section('Section-1', new blob()),
	// 	new balls('Section-1'),
	// 	new balls('Section-2'),
	// ];

	const b1 = new blob('Section-1')
	const b2 = new balls('Section-2')
	// sections[0].test("my data")
}

class Section {
	// self = this;

	constructor(containerName) {
		// console.log(self)
		this.containerName = containerName;
		this.container = document.getElementById(containerName);
		this.heightPercent = this.container.getAttribute('sectionheight');
		this.height = this.heightPercent * vh;
		this.container.classList.add('clickable');


		window.addEventListener("resize", this.resize, false);
		this.container.addEventListener("mousedown", this.handleInput, false);
		// self.func = func;

		

		// self.func.init(self);
	}

	resize(e) {
		this.height = this.heightPercent * vh;
		// this.func.resize(e);
		// console.log(`${self.name} has resized`)
	}
	handleInput(e) { 

		console.log(`main class`)
		// self.func.handleInput(e);
	}
}

class balls extends Section {
	self = this;

	constructor(containerName) {
		super(containerName);

		console.log(containerName)

		// super.initListeners(this)
		
	}

	handleInput(e) { 
		super.handleInput(e);
		console.log(this)
		// console.log(`${this.name} has been clicked`)
		
		// console.log(this)
	}
}

/*
* Section-1 Canvas
*/

class blob extends Section {
	
	// Initializes the sketch
	constructor(containerName) {
		super(containerName);
		self = this;

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
				value: new THREE.Vector2(0, 0)
			}
		};

		// Create the shader material
		var material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			transparent: true,
			vertexShader: document.getElementById("vertexShader").textContent,
			fragmentShader: document.getElementById("fragmentShader").textContent
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
		this.uniforms.u_time.value = this.clock.getElapsedTime();
		this.renderer.render(this.scene, this.camera);
	}

	resize(e) {
		this.renderer.setSize(window.innerWidth, this.height);
	}

	handleInput(e) {
		super.handleInput(e);
		console.log(self)
		self.uniforms.u_posSeed.value.set(self.randomBetween(), self.randomBetween());
	}

	

	randomBetween(min = 1000, max = 10000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}