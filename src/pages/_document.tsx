/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      data-layout="vertical"
      data-topbar="light"
      data-sidebar="dark"
      data-sidebar-size="lg"
      data-sidebar-image="none"
    >
      <Head>
        {/* <script src="http://localhost:8097"></script> */}
        <link rel="icon" href="/assets/images/favicon.ico"></link>
        <link
          href="/assets/libs/gridjs/theme/mermaid.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/libs/dropzone/dropzone.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/libs/leaflet/leaflet.css"
          rel="stylesheet"
          type="text/css"
        />

        {/* <!-- Bootstrap Css --> */}
        <link
          href="/assets/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* <!-- Icons Css --> */}
        <link
          href="/assets/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* <!-- App Css--> */}
        <link href="/assets/css/app.min.css" rel="stylesheet" type="text/css" />
        {/* <!-- custom Css--> */}
        <link
          href="/assets/css/custom.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />       
        <script
          type="text/javascript"
          src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/libs/simplebar/simplebar.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/libs/node-waves/waves.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/libs/feather-icons/feather.min.js"
        ></script>
        <script
          type="text/javascript"
          src="/assets/libs/leaflet/leaflet.js"
        ></script>
        {/* <script type="text/javascript" src="/assets/js/app.js"></script> */}
      </body>
    </Html>
  );
}
