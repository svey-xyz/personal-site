import React from "react";
import Icon_X from '@public/icons/logo/X.svg'
import Icon_Y from '@public/icons/logo/Y.svg'
import Icon_Z from '@public/icons/logo/Z.svg'

export type iconOptions = {
	type: 'static' | 'toggle' | 'hover'
}

export function Icon({ args }: { args: iconOptions }) {
	let iconStyle: {xStyle: string, yStyle: string, zStyle: string } = {
		xStyle: '',
		yStyle: '',
		zStyle: ''
	}

	switch (args.type) {
		case `static`:
			break;

		case `toggle`:
			iconStyle = {
				xStyle: 'duration-1000 transition-transform peer-checked:rotate-0 peer-checked:duration-500',
				yStyle: 'duration-1000 transition-transform peer-checked:-rotate-6 peer-checked:translate-x-6 peer-checked:duration-500',
				zStyle: 'duration-1000 transition-transform peer-checked:rotate-6 peer-checked:translate-x-[2.8rem] peer-checked:duration-500'
			}
			break;

		case `hover`:
			iconStyle = {
				xStyle: 'duration-1000 transition-transform group-hover:rotate-0 group-hover:duration-500',
				yStyle: 'duration-1000 transition-transform group-hover:-rotate-6 group-hover:translate-x-6 group-hover:duration-500',
				zStyle: 'duration-1000 transition-transform group-hover:rotate-6 group-hover:translate-x-[2.8rem] group-hover:duration-500'
			}
			break;
	}

	return (
		<div className="group relative flex items-center justify-center w-icon h-icon cursor-pointer">
			{ args.type == 'toggle' &&
			<input name="Icon interaction" aria-label={`Used to interact with the site icon and ofr animations.`} type="checkbox"
				className="peer absolute cursor-pointer min-w-full min-h-full appearance-none z-10 left-0 checked:min-w-[275%]" />
			}
			<Icon_Z className={`absolute min-h-full min-w-full fill-[#837da1] drop-shadow-md
				${iconStyle.zStyle}`} />
			<Icon_X className={`absolute min-h-full min-w-full fill-[#333] dark:fill-[#eee] drop-shadow-md
				${iconStyle.xStyle}`} />
			<Icon_Y className={`absolute min-h-full min-w-full fill-[#d0b6c8] drop-shadow-md
				${iconStyle.yStyle}`} />
		</div>
		
	)
}

export default Icon;