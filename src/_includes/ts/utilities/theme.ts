
export class theme {
	height: number;
	themeSwitch: HTMLInputElement;

	primaryBg: colour
	primaryAccent: colour
	secondaryAccent: colour
	vh: number
	mobile: boolean;


	constructor() {
		this.mobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		this.themeSwitch = <HTMLInputElement>document.querySelector('#themeSwitcher');
		this.themeSwitch.addEventListener("click", () => {
			let theme = this.themeSwitch.checked ? 'light' : 'dark';
			localStorage.setItem('preferredTheme', theme);
			this.switchTheme(theme);
		});

		this.height = window.innerHeight;
		this.vh = this.height * 0.01;

		window.addEventListener("resize", this.resize);
		this.resize();

		let themeTest = window.matchMedia("(prefers-color-scheme: light)");
		let systemTheme = themeTest.matches ? 'light' : 'dark';

		let userPreference = localStorage.getItem('preferredTheme');
		let theme = userPreference ? userPreference : systemTheme;
		this.switchTheme(theme);

		this.primaryBg = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--primary-bg'));
		this.primaryAccent = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--primary-accent'));
		this.secondaryAccent = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--secondary-accent'));
	}

	switchTheme(theme: string) {

		localStorage.setItem('theme', theme);
		document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
		this.themeSwitch.checked = theme === 'light';

	}

	resize() {
		if (!this.mobile) {
			this.height = window.innerHeight;
			this.vh = this.height * 0.01;
		}

		this.vh = this.height * 0.01;
		document.documentElement.style.setProperty('--vh', `${this.vh}px`);
	}
}
