import { loadModules } from '../utilities/helpers'

/******** VARIABLES ********/
var ver = '0.1.2';
var mobile = false;
var height:number;
const prevPage = document.referrer;
declare global {
	var vh:number;
}

/******** INITIALIZATION ********/
; (function () {
	if (/Mobi|Android/i.test(navigator.userAgent)) {
		mobile = true;
	}

	height = window.innerHeight;
	global.vh = height * 0.01;

	window.addEventListener("resize", resize);
	resize();

	console.log(`JS Version is: ${ver}`);

})();

function resize() {
	if (!mobile) { 
		height = window.innerHeight;
		global.vh = height * 0.01;
	}

	document.documentElement.style.setProperty('--vh', `${global.vh}px`);
}

/******** LOAD BLOCK SCRIPTS ********/
document.addEventListener(
	'DOMContentLoaded',
	() => {
		loadModules([
			{
				selector: '#header',
				script: import('../components/headers/header')
			},
			{
				selector: '.interactiveSection > .section-container > .blobShader',
				script: import('../components/blocks/interactiveSections/blobShader')
			},
			{
				selector: '.projectsArchive > [data-filterable="true"]', // don't bother loading script if not filterable
				script: import('../components/blocks/projectsArchive/projectsArchive')
			},
			{
				selector: '.video',
				script: import('../components/blocks/video/video')
			},
			{
				selector: '.contactForm #formContainer',
				script: import('../components/blocks/contactForm/contactForm')
			},
		])
	}
)