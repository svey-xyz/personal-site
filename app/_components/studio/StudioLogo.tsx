import Icon from "@/app/_components/site/Icon";
import Image from "next/image";
import Link from "next/link";

function StudioLogo(props: any) {
	const { renderDefault, title } = props;

	return (
		<div className="flex items-center">
			<>{renderDefault(props)}</>
		</div>
	)
}

export default StudioLogo