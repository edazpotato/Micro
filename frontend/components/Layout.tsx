import Router, { useRouter } from "next/router";

import Head from "next/head";
import NProgress from "nprogress";
import { NavBar } from ".";
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
			<NavBar />
			<main className="scrollable w-full h-full flex-1 bg-background dark:bg-background-d text-text dark:text-text-d overflow-y-auto">
				<section className="container mx-auto">{children}</section>
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
