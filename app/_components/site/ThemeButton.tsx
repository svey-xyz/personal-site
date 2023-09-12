'use client'

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ThemeState {
	darkMode: boolean | null;
}

class ThemeButton extends React.Component<{}, ThemeState> {
	constructor(props: {}) {
		super(props);
		this.state = { darkMode: null }
		this.handleThemeSwitch = this.handleThemeSwitch.bind(this);
	}

	getPref() {
		let systemPrefDark = window.matchMedia("(prefers-color-scheme: dark)") ? true : false;
		let storagePrefDark: boolean | null = localStorage.getItem('darkMode') ?
			JSON.parse(localStorage.getItem('darkMode')!) :
			null;

		let darkModePref = storagePrefDark != null ? storagePrefDark : systemPrefDark;

		return darkModePref;
	}

	handleThemeSwitch(event: any | null) {
		let darkMode = event ? (event.target as HTMLInputElement).checked : this.getPref();

		this.setState({
			darkMode: darkMode
		})

		localStorage.setItem('darkMode', JSON.stringify(this.state.darkMode));
		document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
	}

	render(): React.ReactNode {
		return (
			<label className="group cursor-pointer relative flex items-center justify-center text-medium-accent leading-xs w-8 h-8 text-3xl">
				<input onClick={(event) => this.handleThemeSwitch(event)} aria-label="Theme Switcher" id="themeSwitcher" type="checkbox"
					className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none
					after:absolute after:overflow-hidden after:-z-1 after:inset-0 after:min-h-full after:w-full
					after:bg-primary-accent after:rounded-full after:shadow-sm
					after:duration-100 group-hover:after:scale-[0.8] group-hover:after:shadow-md
					motion-safe:group-hover:after:animate-pulse
					checked:after:bg-secondary-accent"/>
				<SunIcon className="relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.4]" />
				<MoonIcon className="relative w-[80%] !hidden peer-checked:!block duration-100 group-hover:scale-[1.35]" />
			</label>
		)
	}
}

export default ThemeButton;