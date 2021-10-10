import Head from "next/head";
import { NavBar } from ".";
import { ReactNode } from "react";
import clsx from "clsx";
interface LayoutProps {
	children: ReactNode | ReactNode[];
	title?: string;
	authPage?: boolean;
	className?: string;
}

export function Layout({ children, title, authPage, className }: LayoutProps) {
	return (
		<>
			<Head>
				<title>Micro {title && `// ${title}`}</title>
			</Head>
			{!authPage && <NavBar />}
			<main
				className={clsx(
					authPage
						? "flex flex-col items-center justify-center"
						: "pt-27 flex items-center flex-col",
					"scrollable w-full  h-full flex-1 bg-background dark:bg-background-d overflow-x-hidden overflow-y-auto",
					className
				)}>
				{children}
			</main>
		</>
	);
}
