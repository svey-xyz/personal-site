import React from "react";
import Icon_X from '@public/icons/logo/X.svg'
import Icon_Y from '@public/icons/logo/Y.svg'
import Icon_Z from '@public/icons/logo/Z.svg'


export function Icon() {
	return (
		<div aria-label={`Site Icon`}
			className="group cursor-pointer relative flex items-center justify-center w-icon h-icon" >
			<Icon_Z className="absolute min-h-full min-w-full fill-[#837da1] drop-shadow-md
				duration-300 transition-transform group-hover:rotate-6 group-hover:translate-x-12" />
			<Icon_X className="absolute min-h-full min-w-full fill-[#333] dark:fill-[#eee] drop-shadow-md
				duration-300 transition-transform group-hover:rotate-0" />
			<Icon_Y className="absolute min-h-full min-w-full fill-[#d0b6c8] drop-shadow-md
				duration-300 transition-transform group-hover:-rotate-6 group-hover:translate-x-6" />
		</div>
	)
}

export default Icon;