import { ReactNode } from "react";
import clsx from "clsx";

export interface TypographyProps {
	children: ReactNode;
	largeness?:
		| "massive"
		| "huger"
		| "huge"
		| "large"
		| "normal"
		| "button"
		| "small";
	boldness?: "not at all" | "slightly bold" | "mediumly bold" | "bold";
	element?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "p"
		| "blockquote"
		| "span";
	className?: string;
}

export function Typography({
	children,
	largeness,
	element,
	boldness,
	className,
}: TypographyProps) {
	let Element = element;

	let size = largeness || "normal";
	let bold = boldness || "regular";

	if (!Element)
		switch (size) {
			case "massive":
				Element = "h2";
				break;
			case "huge":
				Element = "h2";
				break;
			case "normal":
				Element = "p";
				break;
			default:
				Element = "span";
				break;
		}

	// if (variant === "button") {
	// 	return <Element className="">{children}</Element>;
	// }

	return (
		<Element
			className={clsx(
				"MicroTypography text-text dark:text-text-d inline-block",
				size === "massive"
					? "text-massive"
					: size === "huger"
					? "text-huger"
					: size === "huge"
					? "text-huge"
					: size === "large"
					? "text-large"
					: size === "normal"
					? "text-normal"
					: size === "button"
					? "text-button"
					: "text-small",
				bold === "bold"
					? "font-bold"
					: bold === "semi-bold"
					? "font-semibold"
					: bold === "medium"
					? "font-medium"
					: bold === "normal"
					? "font-normal"
					: "font-button",
				className
			)}>
			{children}
		</Element>
	);
}
