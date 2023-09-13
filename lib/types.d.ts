type metadataPropsType = {
	params: { id: string }
}

export type previewType = {
	token: string | undefined;
} | undefined;

export type themeType = "light" | "dark";

export type componentParamsType = {
	client: SanityClient,
	preview: previewType,
	theme: themeType,
}
