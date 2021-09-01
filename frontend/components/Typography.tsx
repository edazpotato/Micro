import { ReactNode } from "react";

export function Typography({
	children,
	largeness,
	element,
	boldness,
}: {
	children: ReactNode;
	largeness?: "massive" | "huge" | "large" | "normal";
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
}) {
	let size = largeness || "normal";
	let bold = boldness || "regular";
	let Element = element;
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
					: bold === "semi-bold"
					? "font-semibold"
					: bold === "medium"
					? "font-medium"
					: "font-normal"
			}`}
		>
			{children}
		</Element>
	);
}
