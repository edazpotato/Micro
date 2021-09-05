import { MouseEvent, ReactChild } from "react";

import { useFocusRing } from "@react-aria/focus";

export interface ButtonProps {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	children?: ReactChild;
	colour: "blue" | "grey";
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
	const { isFocusVisible, focusProps } = useFocusRing();
	const Element = link ? "a" : "button";

	return (
		<Element
			{...focusProps}
			tabIndex={disabled ? -1 : 0}
			onClick={(e) => !disabled && onPress && onPress(e)}
			disabled={disabled}
			className={`MicroButton cursor-default duration-100 ease-in-out flex items-center justify-center text-center font-semibold font-13 min-w-84 outline-none focus:outline-none ${
				colour === "blue"
					? `border rounded-full py-7.5 px-15.5 ${
							disabled
								? "bg-inset dark:bg-inset-d  border-border dark:border-border-d text-placeholder dark:text-placeholder-d"
								: "bg-blue text-white border-tansparent hover:bg-blue-hover active:bg-blue-active"
					  }`
					: `p-17.5 w-full bg-inset-d text-placeholder-d ${
							disabled
								? ""
								: "hover:bg-grey-hover active:bg-grey-active"
					  }`
			} ${isFocusVisible ? "focus:ring-4" : ""}`}
			{...rest}
		>
			{/* <Typography boldness="mediumly bold" largeness="button"> */}
			{children ? children : "Button with nochildren"}
			{/* </Typography> */}
		</Element>
	);
}
