
export class theme {
	height: number;
	themeSwitch: HTMLInputElement;

	primaryBg: colour
	primaryAccent: colour
	secondaryAccent: colour
	vh: number
	ogVH: number
	mobile: boolean;

	resizeHandler: (e: Event) => void;

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
		this.ogVH = this.vh

		this.resizeHandler = this.resize.bind(this);
		window.addEventListener('resize', utils.domUtils.debounce(this.resizeHandler));
		this.setSize()

		let themeTest = window.matchMedia("(prefers-color-scheme: light)");
		let systemTheme = themeTest.matches ? 'light' : 'dark';

		let userPreference = localStorage.getItem('preferredTheme');
		let theme = userPreference ? userPreference : systemTheme;
		this.switchTheme(theme);

		this.primaryBg = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--primary-bg'));
		this.primaryAccent = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--primary-accent'));
		this.secondaryAccent = utils.colourUtils.hexConverter(getComputedStyle(document.documentElement).getPropertyValue('--secondary-accent'));
	}

	resize(e: Event): void { };


	switchTheme(theme: string) {

		localStorage.setItem('theme', theme);
		document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
		this.themeSwitch.checked = theme === 'light';

	}

	setSize() {
		if (!this.mobile) {
			this.height = window.innerHeight;
		}

		this.vh = this.height * 0.01;
		document.documentElement.style.setProperty('--vh', `${this.vh}px`);
		// console.log(`Height resized: ${ this.vh }`)
	}

	
	public get getVH(): number {
		return this.vh
	}
	
}

theme.prototype.resize = function (e: Event) {
	this.setSize()
};
