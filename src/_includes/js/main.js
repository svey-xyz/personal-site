/******** VARIABLES ********/
var ver = '0.0.1';
var mobile = false;
var height;
var vh;
const prevPage = document.referrer;

/******** INITIALIZATION ********/
; (function () {
	if (/Mobi|Android/i.test(navigator.userAgent)) {
		mobile = true;
	}

	height = window.innerHeight;
	vh = height * 0.01;
	window.addEventListener("resize", resize);

	addClickListeners();
	resize();
})();

function addClickListeners() {
	// document.addEventListener("touchstart", handleEvent);
	document.addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
}

function resize() {
	if (!mobile) { 
		height = window.innerHeight;
		vh = height * 0.01;
	}

	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
