import type { GetServerSideProps } from 'next'
import { SITE_URL } from '@/data/site'

const toText = (origin: string) =>
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${origin}/sitemap.xml`, ''].join(
    '\n'
  )

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const host = req.headers.host
  const origin = SITE_URL || (host ? `https://${host}` : '')

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  )
  res.write(toText(origin))
  res.end()

  return { props: {} }
}

export default function RobotsTxt() {
  return null
}
