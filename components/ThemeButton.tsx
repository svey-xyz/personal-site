"use client"; // Required to set the onClick.

import { setTheme } from "@helpers/SetTheme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React from "react";

export function ThemeButton() {

	return(
			<label className = "group cursor-pointer relative flex items-center justify-center leading-xs w-icon h-icon" >
			<input 
				aria-label="Theme Switcher" id="themeSwitcher" type="checkbox" 
					className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none
					after:absolute after:overflow-hidden after:-z-1 after:inset-0 after:min-h-full after:w-full
					after:bg-primary-accent after:rounded-full after:shadow-sm
					after:duration-100 group-hover:after:scale-[0.82] group-hover:after:shadow-md
					motion-safe:group-hover:after:animate-pulse
					dark:after:bg-secondary-accent"/>
				<SunIcon className="text-opposite-bg relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.3]" />
				<MoonIcon className="text-opposite-bg relative w-[80%] !hidden peer-checked:!block duration-100 group-hover:scale-[1.2]" />
			</label >
		)
}

export default ThemeButton;