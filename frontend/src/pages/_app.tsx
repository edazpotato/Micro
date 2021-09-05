import "../styles/globals.scss";
import "../styles/nprogress.scss";
import "../styles/tailwind.css";
import "@fontsource/inter";

import { AppProps } from "next/app";
import { Layout } from "../components";
import { SSRProvider } from "@react-aria/ssr";

export default function MicroApp({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SSRProvider>
	);
}
