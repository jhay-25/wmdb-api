import Head from 'next/head'

const endpoints = [
  {
    method: 'GET',
    path: '/mountains/search',
    description: 'Search for mountains by name and location',
    tip: "You can use the 'c:' filter to narrow your results by country using the ISO 3166-1 alpha-2 code. Example: 'apo c:ph'",
    parameters: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'Search query'
      }
    ],
    response: {
      success: true,
      data: [
        {
          id: '75c0632e-3e8a-4283-8e23-bb7f201cca72',
          name: 'Mount Pulag',
          elevation_ft: null,
          elevation_m: 2926,
          latitude: 16.59772,
          longitude: 120.89875,
          prominence_ft: null,
          prominence_m: 2926,
          description: '',
          highlights: null,
          canonical_url: 'pulag',
          difficulty_level: null,
          banner_path: '',
          country_name: 'Philippines',
          province_name: 'Benguet',
          region_name: 'Cordillera Administrative Region'
        }
      ]
    }
  },
  {
    method: 'GET',
    path: '/mountains/:canonicalUrl',
    description: 'Get detailed information about a specific mountain',
    parameters: [
      {
        name: 'canonicalUrl',
        type: 'string',
        required: true,
        description: 'URL-friendly mountain identifier'
      }
    ],
    response: {
      success: true,
      data: {
        mountain: {
          id: 'ab58d8f7-d9ac-4092-b680-8ac2ad1d3f0d',
          created_at: '2025-06-13T00:55:00.148779+00:00',
          name: 'Mount Rainier',
          elevation_ft: null,
          elevation_m: 4390,
          latitude: 46.8528267,
          longitude: -121.7604408,
          prominence_ft: null,
          prominence_m: null,
          description: null,
          highlights: null,
          canonical_url: 'mount-rainier-washington',
          difficulty_level: null,
          other_name: null,
          created_by: null,
          banner_path: null
        },
        countries: [{ id: 2, name: 'United States', iso_code: 'US' }],
        islands: [],
        ranges: [],
        regions: [{ id: 65, name: 'Washington' }],
        provinces: []
      }
    }
  }
]

export default function Endpoints() {
  return (
    <>
      <Head>
        <title>The World Mountain Database - API Endpoints</title>
        <meta
          name="description"
          content="Complete API endpoint reference for The World Mountain Database"
        />
      </Head>

      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">API Endpoints</h1>
          <p className="text-gray-300">
            Complete reference for all available endpoints
          </p>
        </div>

        <div className="bg-main-400 border border-brown-500/30 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-2">Base URL</p>
          <code className="text-lg ">
            {process.env.NEXT_PUBLIC_API_BASE_URL ||
              'https://workers.akyatbundok.com/api/public'}
          </code>
        </div>

        {endpoints.map((endpoint, idx) => (
          <div
            key={idx}
            className="border border-brown-500/30 rounded-lg p-6 bg-main-400"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brown-500 text-white rounded text-sm font-semibold">
                {endpoint.method}
              </span>
              <code className="text-brown-200 text-lg">{endpoint.path}</code>
            </div>

            <p className="text-gray-300 mb-6">{endpoint.description}</p>

            {endpoint.tip && (
              <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-semibold text-sm inline-block text-nowrap">
                    💡 Tip:
                  </span>
                  <p className="text-gray-300 text-sm">{endpoint.tip}</p>
                </div>
              </div>
            )}

            {endpoint.parameters.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3">Parameters</h3>
                <div className="space-y-3">
                  {endpoint.parameters.map((param, pidx) => (
                    <div key={pidx} className="bg-main-500 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-brown-200">{param.name}</code>
                        <span className="text-gray-500 text-sm">
                          ({param.type})
                        </span>
                        {param.required && (
                          <span className="text-red-400 text-sm">required</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {param.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold mb-3">
                Example Response
              </h3>
              <pre className="bg-main-500 rounded p-4 overflow-auto text-sm text-gray-300">
                {JSON.stringify(endpoint.response, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
