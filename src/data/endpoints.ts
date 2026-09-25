export interface EndpointParam {
  name: string
  type: string
  required?: boolean
  default?: string
  description: string
}

export interface Endpoint {
  method: string
  path: string
  summary: string
  exampleQuery: string
  params: EndpointParam[]
  response: unknown
  notes: string[]
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://wmdb.akyatbundok.dev/api'

// Anchor id for the endpoint on /endpoints.
export const endpointId = (path: string) =>
  path === '/' ? 'root' : path.replace(/^\//, '').replace(/\//g, '-')

export const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/',
    summary: 'Service banner, and the quickest way to check the API is up.',
    exampleQuery: '',
    params: [],
    response: { message: 'WMDB API is up and running. 👋' },
    notes: ['Trailing slashes do matter: /api works, /api/ does not.']
  },
  {
    method: 'GET',
    path: '/health',
    summary: 'Status for uptime checks.',
    exampleQuery: '',
    params: [],
    response: {
      status: 'ok',
      service: 'wmdb',
      environment: 'production',
      time: '2026-09-25T21:19:21.101Z'
    },
    notes: ['A 200 only means the API answered. It does not check the data.']
  },
  {
    method: 'GET',
    path: '/mountains/search',
    summary: 'Search mountains by name, optionally within one country.',
    exampleQuery: '?q=mount&limit=2',
    params: [
      {
        name: 'q',
        type: 'string',
        required: true,
        description: 'Free text.'
      },
      {
        name: 'country',
        type: 'string',
        description: 'ISO 3166-1 alpha-2 code, e.g. PH.'
      },
      {
        name: 'limit',
        type: 'integer',
        default: '20',
        description: 'Up to 50.'
      },
      {
        name: 'offset',
        type: 'integer',
        default: '0',
        description: 'Zero or more.'
      }
    ],
    response: {
      results: [
        {
          id: 'c5157d4f-8e88-4ae1-8f9f-f875f70ecc96',
          name: 'Mount  Ogigata',
          created_at: '2025-06-24T05:01:38.096603+00:00',
          other_name: '扇形山',
          banner_path: null,
          elevation_m: 1053,
          region_name: 'Nara',
          country_name: 'Japan',
          prominence_m: null,
          canonical_url: '扇形山-nara'
        },
        {
          id: 'db5d5328-eaae-4fbe-bd15-2178f44fa3a7',
          name: 'mount 387',
          created_at: '2025-05-07T10:29:18.436446+00:00',
          other_name: null,
          banner_path: null,
          elevation_m: 772,
          region_name: 'Central Luzon',
          country_name: 'Philippines',
          prominence_m: null,
          canonical_url: '387'
        }
      ],
      has_more: true,
      mode: 'prefix',
      limit: 2,
      offset: 0
    },
    notes: [
      'mode reports how the name matched: prefix, substring or empty.',
      'No coordinates in the results. Use nearby or in-bounds if you need a position.'
    ]
  },
  {
    method: 'GET',
    path: '/mountains/nearby',
    summary: 'Mountains within a radius of a point, nearest first.',
    exampleQuery: '?lat=14.6&lng=120.98&radius=100000&limit=1',
    params: [
      {
        name: 'lat',
        type: 'number',
        required: true,
        description: '−90 to 90.'
      },
      {
        name: 'lng',
        type: 'number',
        required: true,
        description: '−180 to 180.'
      },
      {
        name: 'radius',
        type: 'integer, metres',
        default: '20000',
        description: 'Metres. Up to 100000.'
      },
      {
        name: 'limit',
        type: 'integer',
        default: '20',
        description: 'Up to 50.'
      },
      {
        name: 'offset',
        type: 'integer',
        default: '0',
        description: 'Zero or more.'
      }
    ],
    response: {
      results: [
        {
          id: '050b722f-242f-4290-b486-56a17eb8a3c4',
          name: 'mount mataba',
          latitude: 14.69324,
          longitude: 121.16385,
          created_at: '2025-04-14T08:44:54.015258+00:00',
          other_name: null,
          banner_path: null,
          elevation_m: 448,
          region_name: 'Calabarzon',
          country_name: 'Philippines',
          prominence_m: 108,
          canonical_url: 'mataba',
          distance_meters: 22331.13580871
        }
      ],
      has_more: true,
      radius_meters: 100000,
      limit: 1,
      offset: 0
    },
    notes: [
      'radius_meters is the radius actually used, and each result carries distance_meters from the point you gave.'
    ]
  },
  {
    method: 'GET',
    path: '/mountains/in-bounds',
    summary:
      'Everything inside a map viewport, for plotting. Up to 5 degrees per side.',
    exampleQuery: '?north=34.8&south=34.6&east=135.9&west=135.7&limit=1',
    params: [
      {
        name: 'north',
        type: 'number',
        required: true,
        description: '−90 to 90, and not below south.'
      },
      {
        name: 'south',
        type: 'number',
        required: true,
        description: '−90 to 90.'
      },
      {
        name: 'east',
        type: 'number',
        required: true,
        description: '−180 to 180.'
      },
      {
        name: 'west',
        type: 'number',
        required: true,
        description: '−180 to 180.'
      },
      {
        name: 'limit',
        type: 'integer',
        default: '20',
        description: 'Up to 50.'
      },
      {
        name: 'offset',
        type: 'integer',
        default: '0',
        description: 'Zero or more.'
      }
    ],
    response: {
      results: [
        {
          id: 'c81d395e-2e6c-42f2-a5f3-8f21b6e1f6b4',
          name: 'Mt. Takamine',
          latitude: 34.6147611,
          longitude: 135.894079,
          created_at: '2025-06-24T05:01:38.096603+00:00',
          other_name: '高峰山',
          banner_path: null,
          elevation_m: 632,
          region_name: 'Nara',
          country_name: 'Japan',
          prominence_m: null,
          canonical_url: '高峰山-nara'
        }
      ],
      has_more: true,
      limit: 1,
      offset: 0
    },
    notes: [
      'A west greater than east means the viewport crosses the antimeridian, which is allowed.'
    ]
  }
]
