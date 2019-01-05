import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'

export default class MyDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
