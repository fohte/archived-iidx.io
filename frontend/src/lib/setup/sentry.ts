import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://dfb9a318a264467c856fd5586fca1938@sentry.io/1765594',
  enabled: process.env.NODE_ENV === 'production',
})
