import type { GetServerSideProps } from 'next'
import { SITE_URL, pages } from '@/data/site'

const toXml = (origin: string, lastModified: string) =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map((page) =>
      [
        '  <url>',
        `    <loc>${origin}${page.path}</loc>`,
        `    <lastmod>${lastModified}</lastmod>`,
        `    <changefreq>${page.changeFrequency}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        '  </url>'
      ].join('\n')
    ),
    '</urlset>'
  ].join('\n')

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const host = req.headers.host
  const origin = SITE_URL || (host ? `https://${host}` : '')

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
  )
  res.write(toXml(origin, new Date().toISOString().slice(0, 10)))
  res.end()

  return { props: {} }
}

export default function SitemapXml() {
  return null
}
