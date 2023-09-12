// 'use client'

// import React, { ReactNode, useEffect, useState } from "react";
// import { createContext } from "react";

// interface ThemeState {
// 	darkMode: boolean;
// }

// export type ThemeContextType = {
// 	themeState: ThemeState;
// 	themeSwitch: ThemeProvider['handleThemeSwitch'];
// }

// export const ThemeContext = createContext<ThemeContextType | null>(null);

// export class ThemeProvider extends React.Component<{}, ThemeState> {

// 	state = {
// 		darkMode: this.getPref()
// 	}
// 	children: ReactNode = null;

// 	constructor(props: { children: ReactNode }) {
// 		super(props);
// 		this.children = props.children;
// 	}

// 	componentDidMount(): void {
// 		this.handleThemeSwitch = this.handleThemeSwitch.bind(this);
// 		this.handleThemeSwitch(this.state.darkMode)
// 	}

// 	getPref() {
// 		let systemPrefDark = window.matchMedia("(prefers-color-scheme: dark)") ? true : false;
// 		let storagePrefDark: boolean | null = localStorage.getItem('darkMode') ?
// 			JSON.parse(localStorage.getItem('darkMode')!) :
// 			null;

// 		let darkModePref = storagePrefDark != null ? storagePrefDark : systemPrefDark;

// 		return darkModePref;
// 	}

// 	handleThemeSwitch(setState: boolean) {
// 		console.log('Value Received: ', setState)
// 		this.setState({
// 			darkMode: setState
// 		})

// 		console.log('Dark Mode: ', this.state.darkMode)

// 		localStorage.setItem('darkMode', JSON.stringify(this.state.darkMode));
// 		document.documentElement.classList[this.state.darkMode ? 'add' : 'remove']('dark');
// 	}

// 	render(): React.ReactNode {
// 		return (
// 				<ThemeContext.Provider value={{ themeState: this.state, themeSwitch: this.handleThemeSwitch}}>
// 					{this.children}
// 				</ThemeContext.Provider>
// 		)
// 	}
// }