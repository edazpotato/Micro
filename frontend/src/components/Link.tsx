import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";
interface LinkProps {
	children: string;
	href?: string;
	external?: boolean;
	className?: string;
}

export function Link({
	children,
	href = "#",
	external = true,
	className,
}: LinkProps) {
	const { isFocusVisible, focusProps } = useFocusRing();

	return (
		<a
			{...focusProps}
			className={clsx(
				"text-link font-medium text-14 no-underline hover:underline duration-100 ease-in-out  outline-none focus:outline-none rounded",
				isFocusVisible && "focus:ring-4",
				className
			)}
			href={href}
			target={external ? "_blank" : undefined}
			rel="noopener noreferrer">
			{children}
		</a>
	);
}
