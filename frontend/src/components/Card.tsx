import { ReactNode } from "react";

export function Card({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			className={`MicroCard bg-foreground dark:bg-foreground-d rounded flex ${
				className ? className : ""
			}`}
		>
			{children}
		</section>
	);
}
