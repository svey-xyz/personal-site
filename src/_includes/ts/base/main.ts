import { loadModules } from '../utilities/helpers'

/******** VARIABLES ********/
var ver = '0.1.3';
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
// scriptPath is relative to 'components' folder 
document.addEventListener(
	'DOMContentLoaded',
	() => {
		loadModules([
			{
				selector: '#header',
				scriptPath: '/headers/header'
			},
			{
				selector: '.interactiveSection > .section-container > .blobShader',
				scriptPath: '/blocks/interactiveSections/blobShader'
			},
			{
				selector: '.projectsArchive > [data-filterable="true"]', // don't bother loading script if not filterable
				scriptPath: '/blocks/projectsArchive/projectsArchive'
			},
			{
				selector: '.video',
				scriptPath: '/blocks/video/video'
			}
		])
	}
)