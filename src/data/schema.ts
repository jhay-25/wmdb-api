import { API_BASE_URL } from './endpoints'
import {
  SITE_AUTHOR,
  SITE_NAME,
  SITE_SHORT_NAME,
  absoluteUrl,
  pageSeo
} from './site'

const organization = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: 'https://akyatbundok.com'
}

// Absolute URLs are only emitted when NEXT_PUBLIC_SITE_URL is configured.
const withUrl = (path: string) => {
  const url = absoluteUrl(path)
  return url ? { url } : {}
}

const webSite = () => ({
  '@type': 'WebSite',
  name: SITE_SHORT_NAME,
  description: pageSeo('/').description,
  ...withUrl('/')
})

const webApi = () => ({
  '@type': 'WebAPI',
  name: `${SITE_NAME} API`,
  alternateName: SITE_SHORT_NAME,
  description: pageSeo('/').description,
  url: API_BASE_URL,
  provider: organization,
  ...(absoluteUrl('/') ? { documentation: absoluteUrl('/endpoints') } : {})
})

const breadcrumb = (path: string) => {
  const home = absoluteUrl('/')
  const current = absoluteUrl(path)

  if (!home || !current) return null

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Overview', item: home },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageSeo(path).title,
        item: current
      }
    ]
  }
}

const article = (path: string) => ({
  '@type': 'TechArticle',
  headline: pageSeo(path).title,
  description: pageSeo(path).description,
  ...withUrl(path),
  author: { '@type': 'Person', name: SITE_AUTHOR },
  publisher: organization,
  about: { '@type': 'WebAPI', name: `${SITE_NAME} API`, url: API_BASE_URL }
})

// One @graph per page keeps the page in control of what it claims. The home
// page describes the site and the API; every other page describes itself.
export const structuredData = (path: string) => {
  const trail = breadcrumb(path)
  const graph: Record<string, unknown>[] =
    path === '/' ? [webSite(), webApi()] : [webSite(), article(path)]

  if (trail) graph.push(trail)

  return { '@context': 'https://schema.org', '@graph': graph }
}
