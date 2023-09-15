import { componentParamsType } from "@/lib/types";

export default function Head({ componentParams }: { componentParams: componentParamsType }) {

	return(
		<>
			{/* <title>{settings.title}</title> */}
			<meta content="width=device-width, initial-scale=1"
				name="viewport" />
			<link rel="icon" href="./favicon.ico" />
		</>
	)
}