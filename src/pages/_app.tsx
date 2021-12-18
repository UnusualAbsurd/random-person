import "../styles/globals.css";
import type { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faSignOutAlt);
library.add(fab, faDiscord);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
