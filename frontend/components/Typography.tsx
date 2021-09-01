import { ReactNode } from "react";

export function Typography({
	children,
	variant,
	element,
	bold,
}: {
	children: ReactNode;
	variant?: "massive" | "huge" | "large" | "normal";
	bold?: boolean;
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
	let size = variant || "normal";
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
			className={`text-text dark:text-text-d ${
				size === "massive"
					? "text-massive"
					: size === "huge"
					? "text-huge"
					: size === "large"
					? "text-large"
					: "text-normal"
			} ${bold ? "font-bold" : "font-normal"}`}
		>
			{children}
		</Element>
	);
}
