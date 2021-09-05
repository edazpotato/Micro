import { MouseEvent, ReactChild } from "react";

import { Icon } from "react-feather";
import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";

export interface IconButtonProps {
	link?: boolean;
	onPress?: (event: MouseEvent) => any;
	disabled?: boolean;
	icon: Icon;
	chonky?: boolean;
}

export function IconButton({
	onPress,
	icon,
	link,
	disabled,
	chonky,
}: IconButtonProps) {
	const { isFocusVisible, focusProps } = useFocusRing();

	const Element = link ? "a" : "button";
	const ButtonIcon = icon;

	return (
		<Element
			{...focusProps}
			disabled={disabled}
			onClick={(e) => !disabled && onPress && onPress(e)}
			className={clsx(
				"MicroIconButton cursor-default duration-100 ease-in-out outline-none focus:outline-none",
				chonky
					? clsx(
							"p-9 rounded-full bg-foreground dark:bg-foreground-d text-placeholder dark:text-placeholder-d",
							!disabled &&
								"hover:bg-inset dark:hover:bg-inset-d dark:active:bg-icon-chonk-active-d"
					  )
					: clsx(
							"p-6 text-icon dark:text-icon-d ",
							!disabled &&
								"hover:text-icon-hover active:text-placeholder dark:active:text-placeholder-d"
					  ),
				isFocusVisible && "focus:ring-4"
			)}
		>
			<ButtonIcon className="stroke-current " />
		</Element>
	);
}
