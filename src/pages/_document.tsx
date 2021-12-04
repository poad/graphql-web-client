import React from 'react';

import { Html, Head, Main, NextScript } from 'next/document';

// https://github.com/vercel/next.js/pull/31939
import NextDocument from 'next/dist/pages/_document';

import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
