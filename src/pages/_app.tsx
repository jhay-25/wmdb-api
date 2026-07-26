import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import Router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      }
    })

    const handleRouteChange = () => posthog?.capture('$pageview')

    Router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <PostHogProvider client={posthog}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostHogProvider>
    </>
  )
}
