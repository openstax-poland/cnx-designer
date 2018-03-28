import Raven from 'raven-js'

/**
 * Leave empty to disable Sentry.
 */
const SENTRY_DSN = null

/**
 * Current release identifier.
 */
const RELEASE = null

// Configure Sentry.
Raven.config(SENTRY_DSN, {
    release: RELEASE,
    environment: process.env.NODE_ENV,
}).install()
