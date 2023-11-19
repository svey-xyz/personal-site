import React from 'react';
import Markdown, { ExtraProps } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 as syntaxStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import slugify from 'slugify'

type MarkdownRendererProps = {
	children: string;
};

export function MarkdownRenderer({ children: markdown }: MarkdownRendererProps) {
	return (
		<Markdown
			components={{
				code({ node, inline, className, children, ...props }: any) {
					const match = /language-(\w+)/.exec(className || '');

					return !inline && match ? (
						<SyntaxHighlighter style={syntaxStyle} PreTag="div" language={match[1].toLowerCase()}
							showLineNumbers={true} {...props}>
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
					return <h2 id={slugify(props.children as string, { replacement: '-', lower: true })}>
						{props.children}
					</h2>
				},
				h3(props) {
					return <h3 id={slugify(props.children as string, { replacement: '-', lower: true })}>
						{props.children}
					</h3>
				},
				h4(props) {
					return <h4 id={slugify(props.children as string, { replacement: '-', lower: true })}>
						{props.children}
					</h4>
				},
				
			}}
			remarkPlugins={[]}
		>
			{markdown}
		</Markdown>
	);
}
