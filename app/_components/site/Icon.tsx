import React from "react";
import Icon_X from '@public/icons/logo/X.svg'
import Icon_Y from '@public/icons/logo/Y.svg'
import Icon_Z from '@public/icons/logo/Z.svg'


export function Icon() {
	return (
		<div className="group relative flex items-center justify-center w-icon h-icon">
			<input aria-label={`Site Icon`} type="checkbox" className="peer cursor-pointer absolute min-w-full min-h-full appearance-none z-10 left-0
				checked:min-w-[275%]" />
			<Icon_Z className="absolute min-h-full min-w-full fill-[#837da1] drop-shadow-md
				duration-300 transition-transform peer-checked:rotate-6 peer-checked:translate-x-[2.8rem]" />
			<Icon_X className="absolute min-h-full min-w-full fill-[#333] dark:fill-[#eee] drop-shadow-md
				duration-300 transition-transform peer-checked:rotate-0" />
			<Icon_Y className="absolute min-h-full min-w-full fill-[#d0b6c8] drop-shadow-md
				duration-300 transition-transform peer-checked:-rotate-6 peer-checked:translate-x-6" />
		</div>
		
	)
}

export default Icon;