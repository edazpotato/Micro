import "tailwindcss/tailwind.css";
import "../styles/globals.scss";
import "../styles/nprogress.css";
import "@fontsource/inter";

import { AppProps } from "next/app";
import { Layout } from "../components";

export default function MicroApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
