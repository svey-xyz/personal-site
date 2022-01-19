/******** VARIABLES ********/
var height: number;
let themeSwitch: HTMLInputElement;

/******** INITIALIZATION ********/
export function themeInit() {
	themeSwitch = <HTMLInputElement>document.querySelector('#themeSwitcher');
	themeSwitch.addEventListener("click", () => {
		let theme = themeSwitch.checked ? 'light' : 'dark';
		localStorage.setItem('preferredTheme', theme);
		switchTheme(theme);
	});

	height = window.innerHeight;
	global.vh = height * 0.01;

	window.addEventListener("resize", resize);
	resize();

	let themeTest = window.matchMedia("(prefers-color-scheme: light)");
	let systemTheme = themeTest.matches ? 'light' : 'dark';

	let userPreference = localStorage.getItem('preferredTheme');
	let theme = userPreference ? userPreference : systemTheme;
	switchTheme(theme);

	global.primaryBg = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg');
	global.primaryAccent = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent');

}

function switchTheme(theme:string) {

	localStorage.setItem('theme', theme);
	document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
	themeSwitch.checked = theme === 'light';
	
}

function resize() {
	if (!global.mobile) {
		height = window.innerHeight;
		global.vh = height * 0.01;
	}
	
	global.vh = height * 0.01;
	document.documentElement.style.setProperty('--vh', `${global.vh}px`);
}