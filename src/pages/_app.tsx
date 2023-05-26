import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { DefaultSeo } from "next-seo";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo
        title="Vertaler | Help you find names"
        openGraph={{
          images: [
            {
              url: "/logo.png",
            },
          ],
        }}
      ></DefaultSeo>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
