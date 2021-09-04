import { MouseEvent, ReactChild } from "react";

import { FocusRing } from "@react-aria/focus";

export enum ButtonColours {
	Blue = "blue",
	Grey = "grey",
}

export interface ButtonProps {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	children?: ReactChild;
	colour: ButtonColours;
	// [x: string]: any;
}

export function Button({
	onPress,

	children,
	link,
	disabled,
	colour,
	...rest
}: ButtonProps) {
	const Element = link ? "a" : "button";

	const output = (
		<Element
			onClick={(e) => !disabled && onPress && onPress(e)}
			disabled={disabled}
			className={`cursor-default duration-100 flex items-center justify-center text-center font-semibold font-13 min-w-84 ${
				colour !== ButtonColours.Grey
					? "border rounded-full py-7.5 px-15.5 "
					: ""
			}${
				disabled
					? "bg-inset dark:bg-inset-d  border-border dark:border-border-d text-placeholder dark:text-placeholder-d"
					: `outline-none focus:outline-none ${
							colour === "blue"
								? "bg-blue text-white border-tansparent hover:bg-blue-hover active:bg-blue-active"
								: "p-17.5 w-full bg-inset-d text-placeholder-d hover:bg-grey-hover active:bg-grey-active"
					  }`
			}`}
			{...rest}
		>
			{/* <Typography boldness="mediumly bold" largeness="button"> */}
			{children ? children : "Button with nochildren"}
			{/* </Typography> */}
		</Element>
	);

	if (!disabled)
		return <FocusRing focusRingClass="focus:ring-4">{output}</FocusRing>;

	return output;
}
