import { defineField, defineType } from "sanity";

export const mux = defineType({
	title: 'Mux API',
	name: 'mux.apiKey',
	type: 'document',
	fields: [
		defineField({
			name: 'token',
			type: 'string',
			title: 'Token',
		}),
		defineField({
			name: 'secretKey',
			type: 'string',
			title: 'Secret Key',
		}),
		defineField({
			name: 'enableSignedUrls',
			type: 'boolean',
			title: 'Enable Signed URLs.',
		}),
		defineField({
			name: 'signingKeyId',
			type: 'string',
			title: 'Signing Key ID',
		}),
		defineField({
			name: 'signingKeyPrivate',
			type: 'string',
			title: 'Signing Key Private',
		}),
	]
})