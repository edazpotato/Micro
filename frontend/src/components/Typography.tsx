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
	let bold = boldness || "not at all";

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

	let textSize;
	if (size === "massive") textSize = "text-massive";
	else if (size === "huger") textSize = "text-huger";
	else if (size === "huge") textSize = "text-huge";
	else if (size === "large") textSize = "text-large";
	else if (size === "normal") textSize = "text-normal";
	else if (size === "button") textSize = "text-button";
	else textSize = "text-small";

	let textBoldness;
	if (bold === "bold") textBoldness = "font-bold";
	else if (bold === "slightly bold") textBoldness = "font-semibold";
	else if (bold === "mediumly bold") textBoldness = "font-medium";
	else if (bold === "not at all") textBoldness = "font-normal";
	else textBoldness = "font-button";

	return (
		<Element
			className={clsx(
				"MicroTypography text-text dark:text-text-d inline-block",
				textSize,
				textBoldness,
				className
			)}>
			{children}
		</Element>
	);
}
