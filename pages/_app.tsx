import "@/styles/globals.css";
import Head from "next/head";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hidePaths = ["/login", "/signup", "/404"];

  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkbrary-9-99.vercel.app" />
        <meta property="og:title" content="Linkbrary" />
        <meta
          property="og:description"
          content="나만의 링크를 관리하는 Linkbrary"
        />
        <meta property="og:image" content="/images/home_main.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Linkbrary</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>

      <script
        defer
        src="https://developers.kakao.com/sdk/js/kakao.min.js"
      ></script>

      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <div>
            <Toaster />
          </div>
          {!hidePaths.includes(router.pathname) && <Header />}
          <div className="flex-grow">
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
          {!hidePaths.includes(router.pathname) && <Footer />}
        </div>
      </QueryClientProvider>
    </>
  );
}
