import { ReactNode } from "react";

export interface TypographyProps {
	children: ReactNode;
	largeness?: "massive" | "huge" | "large" | "normal" | "button";
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
	// variant?: "button";
}

export function Typography({
	children,
	largeness,
	element,
	boldness,
}: // variant,
TypographyProps) {
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

	// if (variant === "button") {
	// 	return <Element className="">{children}</Element>;
	// }

	return (
		<Element
			className={`MicroTypography text-text dark:text-text-d ${
				size === "massive"
					? "text-massive"
					: size === "huge"
					? "text-huge"
					: size === "large"
					? "text-large"
					: "text-normal"
			} ${
				bold === "bold"
					? "font-bold"
					: bold === "slightly bold"
					? "font-semibold"
					: bold === "mediumly bold"
					? "font-medium"
					: bold === "not at all"
					? "font-normal"
					: "font-button"
			}`}>
			{children}
		</Element>
	);
}
