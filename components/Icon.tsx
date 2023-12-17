'use client'

import SVGConstructor from '@components/SVGConstructor'
import { ChangeEvent, useEffect, useState } from 'react';

export function Icon({checked=false}:{checked?:boolean}) {
	const [state, setState] = useState<boolean>(checked)
	useEffect(() => {
		window.scrollY > 140 ? setState(true) : setState(false)

		const listener = () => {
			window.scrollY > 140 ? setState(true) : setState(false)
		};
		window.addEventListener("scroll", listener, { passive: true });
		return () => {
			window.removeEventListener("scroll", listener);
		};
	}, []);

	return (
		<a href="/" aria-label='Link to home page.' onMouseEnter={() => { setState(true) }} onMouseLeave={() => { setState(false) }}
			className="group relative flex items-center justify-center w-icon h-icon">
			<IconZ className={`absolute min-h-full min-w-full fill-[#837da1] drop-shadow
				duration-1000 delay-200 transition-transform ${state && "rotate-6 translate-x-[2.8rem] duration-500"}`} />
			<IconX className={`absolute min-h-full min-w-full fill-[#333] dark:fill-[#eee] drop-shadow
				duration-1000 delay-200 transition-transform ${state && "rotate-0 duration-500"}`}/>
			<IconY className={`absolute min-h-full min-w-full fill-[#d0b6c8] drop-shadow
				duration-1000 delay-200 transition-transform ${state && "-rotate-6 translate-x-6 duration-500"}`} />
		</a>
	)
}

export default Icon;

const IconX = ({className=''}) => <SVGConstructor className={className}>
	<g transform="matrix(1,0,0,1,-94,-94)">
		<g transform="matrix(3.34249,0,0,1.35237,-2297.78,-711.962)">
			<g transform="matrix(0.396732,0,0,0.980555,587.55,279.556)">
				<g id="X">
					<path d="M1024,706.938L672.64,355.578C628.892,311.83 557.857,311.83 514.109,355.578L355.578,514.109C311.83,557.857 311.83,628.892 355.578,672.64L706.938,1024L355.578,1375.36C311.83,1419.11 311.83,1490.14 355.578,1533.89L514.109,1692.42C557.857,1736.17 628.892,1736.17 672.64,1692.42L1024,1341.06L1375.36,1692.42C1419.11,1736.17 1490.14,1736.17 1533.89,1692.42L1692.42,1533.89C1736.17,1490.14 1736.17,1419.11 1692.42,1375.36L1341.06,1024L1692.42,672.64C1736.17,628.892 1736.17,557.857 1692.42,514.109L1533.89,355.578C1490.14,311.83 1419.11,311.83 1375.36,355.578L1024,706.938Z" />
				</g>
			</g>
		</g>
	</g>
</SVGConstructor>

const IconY = ({ className = '' }) => <SVGConstructor className={className}>
	<g transform="matrix(1,0,0,1,-94,-94)">
		<g transform="matrix(3.34249,0,0,1.35237,-2297.78,-711.962)">
			<g transform="matrix(0.396732,0,0,0.980555,587.55,279.556)">
				<g id="Y">
					<path d="M1024,706.938L672.64,355.578C628.892,311.83 557.857,311.83 514.109,355.578L355.578,514.109C311.83,557.857 311.83,628.892 355.578,672.64L706.938,1024L355.578,1375.36C311.83,1419.11 311.83,1490.14 355.578,1533.89L514.109,1692.42C557.857,1736.17 628.892,1736.17 672.64,1692.42L1103.27,1261.8L1103.27,1261.8L1261.8,1103.27L1261.8,1103.27L1692.42,672.64C1736.17,628.892 1736.17,557.857 1692.42,514.109L1533.89,355.578C1490.14,311.83 1419.11,311.83 1375.36,355.578L1024,706.938Z" />
				</g>
			</g>
		</g>
	</g>
</SVGConstructor>

const IconZ = ({ className = '' }) => <SVGConstructor className={className}>
	<g transform="matrix(1,0,0,1,-94,-94)">
		<g transform="matrix(3.34249,0,0,1.35237,-2297.78,-711.962)">
			<g transform="matrix(0.396732,0,0,0.980555,587.55,279.556)">
				<g id="Z">
					<path d="M1632.89,322.767L415.11,322.767C364.145,322.767 322.767,364.145 322.767,415.11L322.767,599.795C322.767,650.76 364.145,692.137 415.11,692.137L1038.8,692.137L355.578,1375.36C348.705,1382.23 342.912,1389.78 338.201,1397.79C328.453,1412.4 322.767,1429.95 322.767,1448.82L322.767,1633.1C322.767,1683.95 364.053,1725.23 414.905,1725.23L1633.1,1725.23C1683.95,1725.23 1725.23,1683.95 1725.23,1633.1L1725.23,1448.82C1725.23,1397.97 1683.95,1356.68 1633.1,1356.68L1008.38,1356.68L1692.42,672.64C1697.64,667.421 1702.24,661.813 1706.21,655.912C1718.14,640.35 1725.23,620.894 1725.23,599.795L1725.23,415.11C1725.23,364.145 1683.86,322.767 1632.89,322.767Z" />
				</g>
			</g>
		</g>
	</g>
</SVGConstructor>