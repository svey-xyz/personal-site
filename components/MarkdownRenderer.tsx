import React from 'react';
import Markdown, { ExtraProps } from 'react-markdown';
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from '@styles/style.highlight'
import slugify from 'slugify'

type MarkdownRendererProps = {
	children: string;
	className?: string;
};

export function MarkdownRenderer({ children: markdown, className }: MarkdownRendererProps) {
	return (
		<Markdown
			components={{
				code({ node, inline, className, children, ...props }: any) {
					const match = /language-(\w+)/.exec(className || '');

					return !inline && match ? (
						<SyntaxHighlighter style={style} PreTag="div" language={match[1].toLowerCase()} wrapLongLines={true} {...props}>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code className={className} {...props} >
							{children}
						</code>
					);
				},
				a(props){
					const target = props.href?.startsWith('http') ? '_blank' : '_self'
					return <a href={props.href} target={target}>{props.children}</a>
				},
				img(props) {
					return <img 
						{...props}
						className={`h-full w-auto my-2 ${props.className}`}
					/>
				},
				h1:'h2',
				h2(props) {
					return <h2 id={slugID(props)}>
						{props.children}
					</h2>
				},
				h3(props) {
					return <h3 id={slugID(props)}>
						{props.children}
					</h3>
				},
				h4(props) {
					return <h4 id={slugID(props)}>
						{props.children}
					</h4>
				},
				
			}}
			remarkPlugins={[]}
			rehypePlugins={[rehypeRaw]}
			className={className}
		>
			{markdown}
		</Markdown>
	);
}

function slugID(props: React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement> & ExtraProps): string {
	if (typeof props.children !== `string`) return
	return slugify(props.children as string, { replacement: '-', lower: true })
}