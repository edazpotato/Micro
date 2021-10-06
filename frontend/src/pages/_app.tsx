import "../styles/globals.css";
import "../styles/nprogress.scss";
import "../styles/tailwind.css";
import "@fontsource/inter";

import { AppProps } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import { SSRProvider } from "@react-aria/ssr";
import { useEffect } from "react";

declare global {
	interface Window {
		NProgress?: typeof NProgress;
	}
}

export default function MicroApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		window.NProgress = NProgress;
	}, []);

	return (
		<SSRProvider>
			<Component {...pageProps} />
		</SSRProvider>
	);
}

Router.events.on("routeChangeStart", () => {
	NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
