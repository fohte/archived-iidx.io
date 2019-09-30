import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import * as Sentry from '@sentry/browser'

process.on('unhandledRejection', err => {
  Sentry.captureException(err)
})

process.on('uncaughtException', err => {
  Sentry.captureException(err)
})

export default class MyDocument extends Document {
  public render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link href="/static/dist/fontawesome.css" rel="stylesheet" />
          <link href="/static/dist/ress.min.css" rel="stylesheet" />
          <link href="/static/dist/nprogress.css" rel="stylesheet" />
          <link href="/static/dist/ReactToastify.min.css" rel="stylesheet" />
          <link href="/static/dist/react-day-picker.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
