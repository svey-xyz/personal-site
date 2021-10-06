/******** VARIABLES ********/
var height: number;

/******** INITIALIZATION ********/
console.log('loaded');

export function themeInit() {
	height = window.innerHeight;
	global.vh = height * 0.01;

	window.addEventListener("resize", resize);
	resize();

	let darkThemeTest = window.matchMedia("(prefers-color-scheme: dark)");
	let systemTheme = darkThemeTest.matches ? 'dark' : 'light';

	let wasDarkMode = localStorage.getItem('theme') === 'dark';
	console.log(wasDarkMode)

	// localStorage.setItem('darkmode', wasDarkMode ? '1' : '0');
	localStorage.setItem('theme', 'dark');

	document.documentElement.classList[wasDarkMode ? 'add' : 'remove']('dark');

	global.primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
	global.primaryAccent = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent');

}

function resize() {
	if (!global.mobile) {
		height = window.innerHeight;
		global.vh = height * 0.01;
	}

	document.documentElement.style.setProperty('--vh', `${global.vh}px`);
}