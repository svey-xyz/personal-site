'use client'

import { ReactNode, useState } from "react";
import Modal from "@components/site/MenuModal";

export default function BlogHeader(): ReactNode {
  const [showModal, setShowModal] = useState(false);

	return (
    
		<div>
			<label className="group relative w-[25px] h-[25px] block z-10 cursor-pointer">
				<button onClick={() => setShowModal(!showModal)} aria-label="Root Menu Button"
					className="absolute left-1/2 -translate-x-1/2 w-full h-full appearance-none
					cursor-pointer transition-all duration-200
					origin-center
					before:relative before:origin-center before:rounded-full before:inline-block before:w-full before:h-full
					before:border-medium-accent before:border-solid before:border-4
					motion-safe:group-hover:before:animate-breathing

					after:absolute after:origin-center after:left-1/2 after:top-1/2 after:w-1/3 after:h-1/3 after:rounded-full after:-z-1
					after:bg-medium-accent after:border-medium-accent after:border-solid after:border
					after:transition-transform after:duration-200 after:-translate-x-1/2 after:-translate-y-1/2
					motion-safe:after:animate-pulse

					group-hover:scale-110

					checked:after:accent-background checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:scale-[3.0]"/>
			</label>
			{showModal &&
				<Modal title="test">
					Hello from the modal!
				</Modal>
			}
		</div>
	)
}