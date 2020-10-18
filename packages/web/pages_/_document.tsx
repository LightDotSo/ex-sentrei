/* eslint-disable @typescript-eslint/no-explicit-any */

import {ServerStyleSheets} from "@material-ui/core/styles";
import GoogleFonts from "next-google-fonts";
import NextDocument, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";

import {renderSnippet} from "@sentrei/common/utils/segment";
import "@sentrei/common/utils/sentry";
import "@sentrei/common/utils/registerExceptionHandler";

export default class CustomDocument extends NextDocument {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const materialUiSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = (): any =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any): any =>
          materialUiSheets.collect(<App {...props} />),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {materialUiSheets.getStyleElement()}
        </React.Fragment>,
      ],
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{__html: renderSnippet()}} />
          <GoogleFonts href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap" />
          <GoogleFonts href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <GoogleFonts href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:300,400,500,700&display=swap" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:300,400,500,700&display=swap"
          />
          <link rel="icon" href="/favicon.ico" />
          <script src="https://cdn.jsdelivr.net/npm/first-input-delay@0.1.3/dist/first-input-delay.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
