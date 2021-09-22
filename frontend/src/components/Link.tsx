import clsx from "clsx";

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
	return (
		<a
			className={clsx(
				"text-link font-medium text-14 no-underline hover:underline",
				className
			)}
			href={href}
			target={external ? "_blank" : undefined}
			rel="noopener noreferer">
			{children}
		</a>
	);
}
