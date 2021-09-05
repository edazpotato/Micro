import { ReactNode } from "react";
import clsx from "clsx";

export interface CardProps {
	children: ReactNode;
	className?: string;
	fullWidth?: boolean;
}

export function Card({ children, className, fullWidth }: CardProps) {
	return (
		<section
			className={clsx(
				"MicroCard bg-foreground dark:bg-foreground-d rounded flex",
				fullWidth ? "w-full" : "w-auto",
				className
			)}
		>
			{children}
		</section>
	);
}
