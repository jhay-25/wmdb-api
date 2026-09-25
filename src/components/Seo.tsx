import Head from 'next/head'
import {
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  absoluteUrl,
  pageSeo
} from '@/data/site'

interface SeoProps {
  path: string
  extraKeywords?: string[]
}

export default function Seo({ path, extraKeywords = [] }: SeoProps) {
  const page = pageSeo(path)
  const url = absoluteUrl(page.path)
  const keywords = [...page.keywords, ...extraKeywords]
  const image = SITE_URL ? `${SITE_URL}/logo.png` : ''

  return (
    <Head>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="theme-color" content="#f3f0e7" />

      {url && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={SITE_SHORT_NAME} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  )
}
