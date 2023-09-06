import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, title }: {children:ReactNode, title:string}) => {
	const modalContent = (
		<div className="absolute inset-0 w-full h-full min-h-full flex justify-center items-center z-20
			after:absolute after:inset-0 after:min-h-full after:bg-primary-accent after:-z-10 after:mt-[75px] after:opacity-70">
			<div className="flex flex-col h-screen w-full md:h-fit md:w-auto md:max-w-screen-xl md:mx-auto overflow-hidden bg-red-50 md:flex-row md:rounded-xl shadow-md">
				<div className="border-b-2 bg-secondary-bg px-6 py-6 sm:px-12 md:px-6 lg:px-12 md:border-b-0 md:border-r-2 border-secondary-accent shadow-md md:shadow-lg z-10">
					{/* {% image site.theme.logo, "lazy relative m-0 h-auto w-16 md:w-24", 'Site Logo' %} */}
				</div>

				{/* {# RIGHT SIDE WRAPPER #} */}
				<div className="relative flex flex-col h-auto p-6 bg-gradient-to-b md:bg-gradient-to-r from-secondary-bg via-primary-bg to-primary-bg w-full px-6 sm:px-12">
					{/* {# NAVIGATION CONTAINER #} */}
					<div className="relative flex h-auto flex-col md:flex-row justify-start md:items-center flex-wrap">
						{title && <h1>{title}</h1>}
						<div className="pt-3">{children}</div>
						{/* <div className="relative md:inline-block group py-4 pr-16">
							<h6 className="relative z-10"><a href="/{{ navLink | slug }}" className="relative z-10 duration-200
							text-primary-text rounded-md
							group-hover:text-primary-bg
							after:bg-gradient-to-r after:from-primary-accent after:to-secondary-accent
							after:absolute after:left-[-5%] after:right-0 after:bottom-[-12.5%] after:overflow-hidden after:rounded-sm after:-z-1
							after:transition-all after:duration-200 after:h-1 group-hover:after:h-[125%]">
								{{ navItem.title }}
							</a></h6>
						</div> */}
					</div>
					<div className="md:hidden">
						{/* {% include "../../utilities/emailInsert.njk" %} */}
					</div>
				</div>

				<div className="main-padding w-full z-10 fixed bottom-0">
					{/* {% include("layouts/components/footers/menu-footer.njk") %} */}
				</div>

			</div>
			<div className="main-padding">
				{/* {% include "../../utilities/emailInsert.njk" %} */}
			</div>
		</div>
	)
	return ReactDOM.createPortal(
		modalContent,
		document.getElementById("modal-root")!
	);
};

export default Modal