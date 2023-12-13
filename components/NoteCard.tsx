import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { colour } from "@/lib/utils";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaCircleExclamation } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";

enum tones {
	normal,
	warning,
	danger
}

type tone = {
	icon: IconType,
}

const warning: tone = {
	icon: FaCircleExclamation,
}

const defaultTones = [
	warning
]

function NoteCard({ markdown, tone = tones.normal }: { markdown: string, tone?: tones | tone }) {
	const CardTone = (tone as any).icon ? tone as tone : defaultTones[(tone as tones)]

	return (
		<div className={`relative flex flex-row items-center px-6 py-4 gap-4 my-8 w-auto max-w-fit rounded-md border pointer-events-none select-none
			after:bg-bg-primary/10 border-bg-primary/40 after:absolute after:inset-0 after:backdrop-blur-xl after:-z-1`}>
			<div className="">
				<CardTone.icon className="w-icon h-icon text-accent-secondary saturate-150"/>
			</div>
			<MarkdownRenderer className="font-bold text-fg-primary">
				{markdown}
			</MarkdownRenderer>
		</div>
	)
}

export default NoteCard;