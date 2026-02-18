import Head from 'next/head'
import { useState } from 'react'

const endpoints = [
  {
    method: 'GET',
    path: '/mountains/search',
    description: 'Search mountains by name',
    tip: "You can use the 'c:' filter to narrow your results by country using the ISO 3166-1 alpha-2 code. Example: 'rainier c:us'",
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: 'Search query'
      }
    ]
  },
  {
    method: 'GET',
    path: '/mountains/:canonicalUrl',
    description: 'Get detailed information about a specific mountain',
    params: [
      {
        name: 'canonicalUrl',
        type: 'string',
        required: true,
        description: 'URL-friendly mountain identifier'
      }
    ]
  }
]

export default function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [queryParams, setQueryParams] = useState<Record<string, string>>({})
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const buildUrl = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://workers.akyatbundok.com/api/public'
    let path = selectedEndpoint.path

    Object.keys(queryParams).forEach((key) => {
      if (path.includes(`:${key}`)) {
        path = path.replace(`:${key}`, queryParams[key] || `:${key}`)
      }
    })

    const query = Object.entries(queryParams)
      .filter(([key]) => !selectedEndpoint.path.includes(`:${key}`))
      .filter(([, value]) => value !== '')
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')

    return `${baseUrl}${path}${query ? '?' + query : ''}`
  }

  const handleTest = async () => {
    setLoading(true)
    setResponse('')

    try {
      const url = buildUrl()
      const res = await fetch(url)
      const data = await res.json()

      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>The World Mountain Database - API Explorer </title>
        <meta
          name="description"
          content="Test and explore the WMDB API endpoints"
        />
      </Head>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">API Explorer</h1>
          <p className="text-gray-300">
            Test API endpoints directly from your browser
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-white mb-4">Endpoints</h2>
            <div className="space-y-2">
              {endpoints.map((endpoint, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(endpoint)
                    setQueryParams({})
                    setResponse('')
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedEndpoint === endpoint
                      ? 'bg-brown-500 text-white'
                      : 'bg-main-400 text-gray-300 hover:bg-brown-500/50'
                  }`}
                >
                  <div className="font-mono text-sm">{endpoint.method}</div>
                  <div className="text-xs mt-1 break-all">{endpoint.path}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {selectedEndpoint.tip && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 font-semibold text-sm whitespace-nowrap">
                    💡 Tip:
                  </span>
                  <p className="text-gray-300 text-sm">
                    {selectedEndpoint.tip}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Parameters
              </h2>
              <div className="bg-main-400 rounded-lg p-4 space-y-4">
                {selectedEndpoint.params.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No parameters required
                  </p>
                ) : (
                  selectedEndpoint.params.map((param, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {param.name}
                        {param.required && (
                          <span className="text-red-400 ml-1">*</span>
                        )}
                        <span className="text-gray-500 ml-2 text-xs">
                          ({param.type})
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder={param.description}
                        value={queryParams[param.name] || ''}
                        onChange={(e) =>
                          setQueryParams({
                            ...queryParams,
                            [param.name]: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 bg-main-500 border border-brown-500/30 rounded text-white placeholder-gray-500"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">
                Request URL
              </h3>
              <div className="bg-main-400 rounded-lg p-3 font-mono text-sm break-all">
                {buildUrl()}
              </div>
            </div>
            <button
              onClick={handleTest}
              disabled={loading}
              className="w-full bg-brown-500 hover:bg-brown-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Loading...' : 'Test Endpoint'}
            </button>

            {response && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Response
                </h3>
                <pre className="bg-main-400 rounded-lg p-4 overflow-auto max-h-96 text-sm text-gray-300">
                  {response}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
