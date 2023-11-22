export function EmailInsert({ email } : {email:string}) {
	return (
		<a href={`mailto:${email}`} className="group inline-flex flex-col no-underline">
			{emailSplitter(email).map((part) => {
				return (
					<span key={part} className="relative leading-none uppercase font-black text-fg-secondary group-hover:text-fg-primary transition-colors duration-300">
						{ part }
					</span>
				)
			})}
	</a>
	)
}

function emailSplitter(email: string) {
	let emailParts = []
	emailParts[0] = email.slice(0, email.indexOf("@"));
	emailParts[1] = email.slice(email.indexOf("@") + 1);

	emailParts[0].length < emailParts[1].length ? emailParts[0] = `${emailParts[0]}@` : emailParts[1] = `@${emailParts[1]}`

	return emailParts;
}

export default EmailInsert;