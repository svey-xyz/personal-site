import { loadModules } from '../utilities/helpers'
import { themeInit } from '../utilities/theme'


/******** VARIABLES ********/
let ver = '0.1.3';
declare global {
	var mobile:boolean;
	var vh:number;
	var primaryBg:any;
	var primaryAccent: any;
	var hexConverter:any;
}

/******** INITIALIZATION ********/
; (function () {
	global.mobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

	themeInit();
	loadScripts();

	console.log(`JS Version is: ${ver}`);
})();

/******** LOAD BLOCK SCRIPTS ********/
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
