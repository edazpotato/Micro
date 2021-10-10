import { ReactNode } from "react";
import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";

export interface CardProps {
	children: ReactNode;
	className?: string;
	fullWidth?: boolean;
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	[key: string]: any;
}

export function Card({
	children,
	className,
	fullWidth,
	link,
	onPress,
	...rest
}: CardProps) {
	const { isFocusVisible, focusProps } = useFocusRing();
	const Element = link ? "a" : "section";

	return (
		<Element
			{...focusProps}
			onClick={(e) => {
				e.stopPropagation(); // If it's in something clickable like a card,
				e.preventDefault(); // don't fire the card's click event listener(s).
				onPress && onPress((e as unknown) as MouseEvent);
			}}
			tabIndex={link || onPress ? 0 : -1}
			className={clsx(
				"MicroCard bg-foreground dark:bg-foreground-d rounded flex mb-27",
				fullWidth ? "w-full" : "w-535",
				link && "cursor-pointer",
				(link || onPress) &&
					isFocusVisible &&
					"outline-none focus:outline-none focus:ring-4",
				className
			)}
			rel={link ? "noopener noreferrer" : undefined}
			{...rest}>
			{children}
		</Element>
	);
}
