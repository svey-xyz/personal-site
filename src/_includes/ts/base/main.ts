import { loadModules } from '../utilities/helpers'
import { themeInit } from '../utilities/theme'


/** Global Version for the website code */
let ver = '0.1.3';
declare global {
	var mobile:boolean;
	var vh:number;
	var primaryBg:any;
	var primaryAccent: any;
	var hexConverter:any;
}

/**
 * INITIALIZATION
 * @constructor
*/
; (function () {
	global.mobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

	themeInit();
	loadScripts();

	console.log(`JS Version is: ${ver}`);
})();

/**
 * Initiates scripts for all the elements with active scripts on the page.
 * @constructor
 */
function loadScripts() {
	document.addEventListener(
		'DOMContentLoaded',
		() => {
			let interactiveScripts: Array<{selector:string,scriptPath:string}> = []
			document.querySelectorAll('.interactiveSection > .section-container > .script-container').forEach(async (section) => {
				const sectionType = section.getAttribute('data-script')

				interactiveScripts.push({
					selector: `.interactiveSection > .section-container > .script-container, [data-script="${sectionType}"]`,
					scriptPath: `components/blocks/interactiveSections/${sectionType}/${sectionType}`
				})
			});


			loadModules([
				{
					selector: '#header',
					scriptPath: 'components/headers/header'
				},
				...interactiveScripts,
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
