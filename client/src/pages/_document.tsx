import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=Edge; chrome=1" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="링크즈잡 | 이름을 검색하면 기업의 링크정보가 한눈에" />
          <meta property="og:url" content="http://linksjob.me" />
          <meta property="og:image" content="https://i.imgur.com/b0pz7Mk.png" />
          <meta property="og:description" content="링크즈잡 | 이름을 검색하면 기업의 링크정보가 한눈에" />
          <meta name="description" content="링크즈잡 | 이름을 검색하면 기업의 링크정보가 한눈에" />
          <meta name="keyword" content="채용정보, 채용, 면접후기, 기업정보, 취업사이트, 구직사이트" />
          <link rel="shortcut icon" type="image/x-icon" href="/image/favicon.ico" />
          <title>링크즈잡 | 이름을 검색하면 기업의 링크정보가 한눈에</title>
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const styledComponentsSheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => styledComponentsSheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        styledComponentsSheet.getStyleElement(),
      ],
    };
  } finally {
    styledComponentsSheet.seal();
  }
};
