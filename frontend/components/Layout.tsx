import Router, { useRouter } from "next/router";

import Head from "next/head";
import NProgress from "nprogress";
import { ReactElement } from "react";
import { useEffect } from "react";

declare global {
	interface Window {
		NProgress?: typeof NProgress;
	}
}

export function Layout({ children }: { children: ReactElement<any, any> }) {
	const router = useRouter();

	const path = router.pathname.slice(1);
	let title = path;
	if (router.query["user"]) {
		const q = router.query["user"];
		console.log(q);
	}

	useEffect(() => {
		window.NProgress = NProgress;
	}, []);

	return (
		<>
			<Head>
				<title>{title && `${title} // `}Micro</title>
			</Head>
			<header>
				<nav></nav>
			</header>
			<main className="pt-16 w-full h-full dark:bg-background-d dark:text-text-d">
				{children}
			</main>
			<footer></footer>
		</>
	);
}

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
