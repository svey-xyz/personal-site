import { loadModules } from '../utilities/helpers'

/******** VARIABLES ********/
var ver = '0.1.3';
var mobile = false;
var height:number;
const prevPage = document.referrer;
declare global {
	var vh:number;
	var primaryBg:any;
	var hexConverter:any;
}

const hexConverter = function (hex: string) {
	var r: number, g: number, b: number;

	hex = hex.replace(/\s/g, '')

	if (hex.charAt(0) == '#') {
		hex = hex.substr(1);
	}
	if (hex.length == 3) {
		hex = hex.substr(0, 1) + hex.substr(0, 1) + hex.substr(1, 2) + hex.substr(1, 2) + hex.substr(2, 3) + hex.substr(2, 3);
	}
	r = parseInt((hex.charAt(0) + hex.charAt(1)), 16);
	g = parseInt((hex.charAt(2) + hex.charAt(3)), 16);
	b = parseInt((hex.charAt(4) + hex.charAt(5)), 16);
	return { r, g, b };
}

/******** INITIALIZATION ********/
; (function () {
	mobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

	height = window.innerHeight;
	global.vh = height * 0.01;
	global.primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
	global.hexConverter = hexConverter;

	window.addEventListener("resize", resize);
	
	resize();
	loadScripts();

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
function loadScripts() {
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			loadModules([
				{
					selector: '#header',
					scriptPath: 'components/headers/header'
				},
				{
					selector: '.interactiveSection > .section-container > .blobShader',
					scriptPath: 'components/blocks/interactiveSections/blobShader'
				},
				{
					selector: '.projectsArchive > [data-filterable="true"]', // don't bother loading script if not filterable
					scriptPath: 'components/blocks/projectsArchive/projectsArchive'
				},	
				{
					selector: '.contactForm #formContainer',
					scriptPath: 'components/blocks/contact/contact'
				},
				{
					selector: '.video-utility',
					scriptPath: 'utilities/video'
				},
				{
					selector: '.scroll-indicator',
					scriptPath: 'utilities/smoothScroll'
				},
				{
					selector: '#returnTo',
					scriptPath: 'utilities/returnTo'
				},
			])
		}
	)
}
