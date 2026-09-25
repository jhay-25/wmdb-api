export const SITE_NAME = 'World Mountain Database'
export const SITE_SHORT_NAME = 'WMDB API'
export const SITE_AUTHOR = 'John'

// Absolute origin of this documentation site. Set NEXT_PUBLIC_SITE_URL on deploy;
// when it is missing, the sitemap and robots.txt fall back to the request host
// and the canonical/og:url tags are omitted rather than guessing a domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(
  /\/$/,
  ''
)

export const absoluteUrl = (path: string) =>
  SITE_URL ? `${SITE_URL}${path}` : ''

// Shared terms every page competes for, extended per page below.
export const BASE_KEYWORDS = [
  'mountain API',
  'world mountains',
  'World Mountain Database',
  'WMDB',
  'mountain database',
  'free mountain API',
  'mountain data API',
  'mountains REST API',
  'mountain elevation data',
  'mountain coordinates API',
  'peak database',
  'hiking API'
]

export interface PageSeo {
  path: string
  title: string
  description: string
  keywords: string[]
  changeFrequency: string
  priority: number
}

export const pages: PageSeo[] = [
  {
    path: '/',
    title: 'Mountain API — free JSON for world mountains | WMDB',
    description:
      'Search mountains by name, find the peaks around a coordinate, or pull everything inside a map view. Free JSON API, no key, no sign-up.',
    keywords: [
      'search mountains by name',
      'mountains near me',
      'mountain finder',
      'world peaks',
      'mountain elevations',
      'mountains in a map viewport'
    ],
    changeFrequency: 'monthly',
    priority: 1
  },
  {
    path: '/endpoints',
    title: 'Mountain API endpoints — search, nearby, in bounds | WMDB',
    description:
      'Each endpoint with its query parameters and a real response: search by name, nearby by coordinates, in-bounds by viewport, plus health.',
    keywords: [
      'mountain search API',
      'nearby mountains API',
      'mountains in bounds',
      'mountain elevation endpoint',
      'peak search API'
    ],
    changeFrequency: 'monthly',
    priority: 0.8
  },
  {
    path: '/examples',
    title: 'Mountain API examples — JavaScript, Python, cURL | WMDB',
    description:
      'The same mountain search in six languages, plus a few requests worth copying: search a peak, filter by country, find nearby mountains, read a viewport.',
    keywords: [
      'mountain API example',
      'fetch mountains javascript',
      'python mountain API',
      'curl mountain API',
      'mountain API tutorial'
    ],
    changeFrequency: 'monthly',
    priority: 0.7
  },
  {
    path: '/api-explorer',
    title: 'Mountain API explorer — try it in the browser | WMDB',
    description:
      'Send requests to the World Mountain Database from the browser. Fill in the parameters, hit send, read the JSON.',
    keywords: [
      'mountain API test',
      'mountain API playground',
      'try mountain API',
      'online API explorer'
    ],
    changeFrequency: 'monthly',
    priority: 0.6
  }
]

export const pageSeo = (path: string): PageSeo =>
  pages.find((page) => page.path === path) ?? pages[0]
