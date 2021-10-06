import { MouseEvent, ReactChild, ReactElement } from "react";

import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";

export type ButtonProps = {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	colour: "blue" | "grey";
	className?: string;
	children?: ReactChild;
	text?: string;
} & ({ text: string } | { children: ReactElement<any> });

export function Button({
	onPress,
	children,
	disabled,
	colour,
	text,
	className,
}: ButtonProps) {
	const { isFocusVisible, focusProps } = useFocusRing();
	const Element = "button";

	return (
		<div className={clsx("MicroButtonContainer", className)}>
			<Element
				{...focusProps}
				tabIndex={disabled ? -1 : 0}
				onClick={(e) => {
					e.stopPropagation(); // If it's in something clickable like a card,
					e.preventDefault(); // don't fire the card's click event listener(s).
					!disabled && onPress && onPress(e);
				}}
				disabled={disabled}
				className={clsx(
					"MicroButton cursor-default pointer-events-auto select-none duration-100 ease-in-out flex items-center justify-center text-center font-semibold font-13 min-w-84 outline-none focus:outline-none",
					colour === "blue"
						? clsx(
								"border rounded-full py-7.5 px-15.5",
								disabled
									? "bg-inset dark:bg-inset-d  border-border dark:border-border-d text-placeholder dark:text-placeholder-d"
									: "bg-blue text-white border-tansparent hover:bg-blue-hover active:bg-blue-active"
						  )
						: clsx(
								"p-17.5 w-full bg-grey dark:bg-grey-d text-placeholder dark:text-placeholder-d",
								!disabled &&
									"hover:bg-grey-hover dark:hover:bg-grey-hover-d active:bg-grey-active dark:active:bg-grey-active-d"
						  ),
					isFocusVisible && "focus:ring-4"
				)}>
				{children || text}
			</Element>
		</div>
	);
}
