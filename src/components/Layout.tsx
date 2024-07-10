import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import ErrorBanner from "./dialogs/ErrorBanner";
import Script from "next/script";
import Loader from "./Loader";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

type Props = {
  children?: ReactNode;
  title?: string;
  showLoader?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  showLoader,
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="An app that helps your team estimate agile points"
      />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width , maximum-scale=1.0, user-scalable=no"
      />
      <meta name="HandheldFriendly" content="true" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script src="https://umami.alwurts.com/script.js" data-website-id="6d05ef66-ba08-493a-9192-75f0c0c6eced" strategy="afterInteractive"/>
    <Script id="google-analytics" strategy="afterInteractive">
      {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
    </Script>
    <ErrorBanner />
    <Loader config={{ show: showLoader }} />
    {children}
  </div>
);

export default Layout;
