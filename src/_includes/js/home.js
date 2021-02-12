var wH;
var sections = [];

window.onload = function () {
	initSections()
};

function initSections() {
	sections = [
		new Section('Section-1', new blob()),
	];
	// sections[0].test("my data")
}

class Section {
	self = this;

	constructor(containerName, func) {
		self.name = containerName;
		self.container = document.getElementById(containerName);
		self.heightPercent = self.container.getAttribute('sectionheight');
		self.height = self.heightPercent * vh;
		self.container.classList.add('clickable');
		self.func = func;

		window.addEventListener("resize", this.resize, false);
		self.container.addEventListener("mousedown", this.handleInput, false);

		self.func.init(self);
	}

	resize(e) {
		self.height = self.heightPercent * vh;
		self.func.resize(e);
		console.log(`${self.name} has resized`)
	}

	handleInput(e) { 
		self.func.handleInput(e);
	}
}

/*
* Section-1 Canvas
*/

function blob() {

	var renderer, scene, camera, clock, uniforms;

	var self = this;
	
	self.test = function test(data) {
		console.log(`logging ${data}`)
	}
	
	// Initializes the sketch
	self.init = function init(section) {
		self.section = section;

		// Initialize the WebGL renderer
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, section.height);

		// Add the renderer to the sketch container
		section.container.appendChild(renderer.domElement);	

		// Initialize the scene
		scene = new THREE.Scene();

		// Initialize the camera
		camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Initialize the clock
		clock = new THREE.Clock(true);

		// Create the plane geometry
		var geometry = new THREE.PlaneBufferGeometry(2, 2);

		// Define the shader uniforms
		uniforms = {
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
			uniforms: uniforms,
			transparent: true,
			vertexShader: document.getElementById("vertexShader").textContent,
			fragmentShader: document.getElementById("fragmentShader").textContent
		});

		// Create the mesh and add it to the scene
		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		animate();
	}

	// Animates the sketch
	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	// Renders the sketch
	function render() {
		uniforms.u_time.value = clock.getElapsedTime();
		renderer.render(scene, camera);
	}

	self.resize = function resize(e) {
		renderer.setSize(window.innerWidth, self.section.height);	
	}

	self.handleInput = function handleInput(e) {
		uniforms.u_posSeed.value.set(randomBetween(), randomBetween());
	}

	

	function randomBetween(min = 1000, max = 10000) { // min and max included 
		var randBetween = Math.floor(Math.random() * (max - min + 1) + min);
		return (Math.random() > 0.5 ? randBetween : -randBetween);
	}
}