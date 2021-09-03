import { MouseEvent, ReactChild } from "react";

type ButtonProps = {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	[x: string]: any;
};

export function Button({
	onPress,
	children,
	link,
	disabled,
	...rest
}: ButtonProps) {
	const Element = link ? "a" : "button";

	return (
		<Element
			onClick={onPress}
			className={`min-width-84 ${disabled ? "" : ""}`}
			{...rest}
		>
			{children}
		</Element>
	);
}
