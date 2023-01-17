import Layout from "../common/Layout";
import "../styles/globals.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import LoaderDemo from "../common/loader";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Layout footerstatus={pageProps.footerstatus}>
      <>
        <LoaderDemo />
        <Component {...pageProps} />
      </>
    </Layout>
  );
}
export default MyApp;

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
