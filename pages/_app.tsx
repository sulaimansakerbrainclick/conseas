import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";
import "../styles/tools.scss";
import "../styles/fonts.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import MuiThemeProvider from "../components/providers/MuiThemeProvider";
import EmotionProvider from "../components/providers/EmotionProvider";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import PagesLoader from "@/components/reusable/pages-loader";
import SessionProvider from "@/components/providers/SessionProvider";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <EmotionProvider>
        <MuiThemeProvider>
          <ToastContainer />

          <PagesLoader />

          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </MuiThemeProvider>
      </EmotionProvider>
    </>
  );
}

export default appWithTranslation(App);
