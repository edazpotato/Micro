import Head from "next/head";
import { NavBar } from ".";
import { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode | ReactNode[];
	title?: string;
}

export function Layout({ children, title }: LayoutProps) {
	return (
		<>
			<Head>
				<title>Micro {title && `// ${title}`}</title>
			</Head>
			<NavBar />
			<main className="scrollable flex flex-col w-full items-center pt-27 h-full flex-1 bg-background dark:bg-background-d overflow-x-hidden overflow-y-auto ">
				{children}
			</main>
		</>
	);
}
