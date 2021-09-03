import { MouseEvent, ReactChild } from "react";

import { Typography } from ".";

export enum ButtonVariants {
	primary = "primary",
}

export interface ButtonProps {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	label: string;
	variant: ButtonVariants;
	// [x: string]: any;
}

export function Button({
	onPress,
	label,
	link,
	disabled,
	variant,
	...rest
}: ButtonProps) {
	const Element = link ? "a" : "button";

	return (
		<Element
			onClick={(e) => !disabled && onPress && onPress(e)}
			className={`border flex items-center  text-center font-semibold font-13 min-w-84 rounded-full py-7.5 px-15.5 ${
				disabled
					? "bg-inset dark:bg-inset-d  border-border dark:border-border-d text-placeholder dark:text-placeholder-d"
					: "bg-blue text-white border-tansparent"
			}`}
			{...rest}
		>
			{/* <Typography boldness="mediumly bold" largeness="button"> */}
			{label}
			{/* </Typography> */}
		</Element>
	);
}
