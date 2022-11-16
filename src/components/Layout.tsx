import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import ErrorBanner from "./dialogs/ErrorBanner";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width , maximum-scale=1.0, user-scalable=no"
      />
      <meta name="HandheldFriendly" content="true" />
    </Head>
    <ErrorBanner />
    {children}
  </div>
);

export default Layout;
