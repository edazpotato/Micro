import { ReactNode } from "react";
import clsx from "clsx";

export function Card({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			className={clsx(
				"MicroCard bg-foreground dark:bg-foreground-d rounded flex w-auto",
				className
			)}
		>
			{children}
		</section>
	);
}
