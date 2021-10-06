import { Icon } from "react-feather";
import { MouseEvent } from "react";
import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";

export interface IconButtonProps {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	icon: Icon;
	chonky?: boolean;
	className?: string;
	[key: string]: any;
}

export function IconButton({
	onPress,
	icon,
	link,
	disabled,
	chonky,
	className,
	...rest
}: IconButtonProps) {
	const { isFocusVisible, focusProps } = useFocusRing();

	const Element = link ? "a" : "button";
	const ButtonIcon = icon;

	return (
		<div className="MicroIconButtonContainer">
			<Element
				{...focusProps}
				disabled={disabled}
				tabIndex={disabled ? -1 : 0}
				onClick={(e) => {
					e.stopPropagation(); // If it's in something clickable like a card,
					e.preventDefault(); // don't fire the card's click event listener(s).
					!disabled && onPress && onPress(e);
				}}
				className={clsx(
					"MicroIconButton cursor-default pointer-events-auto select-none duration-100 ease-in-out rounded-full outline-none focus:outline-none",
					chonky
						? clsx(
								"p-9 bg-icon-chonk dark:bg-icon-chonk-d text-placeholder dark:text-placeholder-d",
								!disabled &&
									"hover:bg-icon-chonk-hover dark:hover:bg-icon-chonk-hover-d active:bg-icon-chonk-active dark:active:bg-icon-chonk-active-d"
						  )
						: clsx(
								"p-6 text-icon",
								!disabled &&
									"hover:text-icon-hover active:text-icon-active"
						  ),
					isFocusVisible && "focus:ring-4",
					className
				)}
				{...rest}>
				<ButtonIcon className="stroke-current " />
			</Element>
		</div>
	);
}
