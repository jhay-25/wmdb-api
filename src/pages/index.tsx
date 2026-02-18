import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>The World Mountain Database</title>
        <meta
          name="description"
          content="Free REST API for mountain data. Access mountain elevations, coordinates, and geographic information."
        />
        <meta
          name="keywords"
          content="mountain API, hiking API, world mountains, REST API, free API, mountain data, mountain finder"
        />
      </Head>

      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-8">WMDB API</h1>

        <p className="text-lg text-gray-300 mb-8">
          WMDB (The World Mountain Database) API provides mountain metadata,
          including but not limited to elevations, coordinates, and geographic
          information.
        </p>

        <div className="bg-main-400 border border-brown-500/30 rounded-lg p-6 mb-12">
          <p className="text-sm text-gray-400 mb-2">Base URL</p>
          <code className="text-lg">
            {process.env.NEXT_PUBLIC_API_BASE_URL ||
              'https://workers.akyatbundok.com/api/public'}
          </code>
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">
          Getting Started
        </h2>
        <p className="text-gray-300 mb-4">
          All endpoints are publicly accessible and require no authentication.
          Simply make HTTP GET requests to retrieve data in JSON format.
        </p>

        <h3 className="text-lg font-semibold text-white file:mt-8 mb-3">
          Example Request
        </h3>
        <div className="bg-main-400 border border-brown-500/30 rounded-lg p-4 mb-6">
          <code className="text-sm text-gray-300">
            GET{' '}
            {process.env.NEXT_PUBLIC_API_BASE_URL ||
              'https://workers.akyatbundok.com/api/public'}
            /mountains/search?query=rainier
          </code>
        </div>

        <h3 className="text-lg font-semibold text-white mt-8 mb-3">
          Example Response
        </h3>
        <pre className="bg-main-400 border border-brown-500/30 rounded-lg p-4 mb-6 overflow-auto text-sm text-gray-300">
          {`{
  "mountain": {
    "id": "ab58d8f7-d9ac-4092-b680-8ac2ad1d3f0d",
    "created_at": "2025-06-13T00:55:00.148779+00:00",
    "name": "Mount Rainier",
    "elevation_ft": null,
    "elevation_m": 4390,
    "latitude": 46.8528267,
    "longitude": -121.7604408,
    "prominence_ft": null,
    "prominence_m": null,
    "description": null,
    "highlights": null,
    "canonical_url": "mount-rainier-washington",
    "difficulty_level": null,
    "other_name": null,
    "created_by": null,
    "banner_path": null
  },
  "countries": [
    {
      "id": 2,
      "name": "United States",
      "iso_code": "US"
    }
  ],
  "islands": [],
  "ranges": [],
  "regions": [
    {
      "id": 65,
      "name": "Washington"
    }
  ],
  "provinces": []
}`}
        </pre>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">
          Available Endpoints
        </h2>

        <div className="space-y-4 mb-12">
          <div className="border-l-4 border-brown-500 pl-4">
            <h3 className="font-semibold">/mountains/:canonicalUrl</h3>
            <p className="text-gray-400 text-sm">
              Get detailed mountain information
            </p>
          </div>

          <div className="border-l-4 border-brown-500 pl-4">
            <h3 className="font-semibold">/mountains/search</h3>
            <p className="text-gray-400 text-sm">
              Search mountains by name and location
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-12">
          <Link
            href="/api-explorer"
            className="inline-block bg-brown-500 hover:bg-brown-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try API Explorer
          </Link>
          <Link
            href="/endpoints"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View All Endpoints
          </Link>
        </div>
      </div>
    </>
  )
}
