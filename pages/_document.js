/* eslint-disable react/no-danger, import/no-unresolved */
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractStyles } from "evergreen-ui";

export default class Doc extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    // `css` is a string with css from both glamor and ui-box.
    // No need to get the glamor css manually if you are using it elsewhere in your app.
    //
    // `hydrationScript` is a script you should render on the server.
    // It contains a stringified version of the glamor and ui-box caches.
    // Evergreen will look for that script on the client and automatically hydrate
    // both glamor and ui-box.
    const { css, hydrationScript } = extractStyles();
    return {
      ...page,
      css,
      hydrationScript
    };
  }

  render() {
    return (
      <html>
        <Head>
          <title>YIMBY Signin</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.hydrationScript}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}