import Head from 'next/head'
import { useState } from 'react'

const languages = [
  {
    name: 'JavaScript/Fetch',
    code: `fetch('${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search?query=pulag')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
  },
  {
    name: 'Python/Requests',
    code: `import requests

response = requests.get(
    '${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search',
    params={'query': 'pulag'}
)

data = response.json()
print(data)`
  },
  {
    name: 'cURL',
    code: `curl "${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search?query=pulag"`
  },
  {
    name: 'PHP',
    code: `<?php
$url = '${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search?query=pulag';
$response = file_get_contents($url);
$data = json_decode($response, true);

print_r($data);
?>`
  },
  {
    name: 'Go',
    code: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    resp, err := http.Get("${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search?query=pulag")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    var data map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&data)
    fmt.Println(data)
}`
  },
  {
    name: 'Ruby',
    code: `require 'net/http'
require 'json'

uri = URI('${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://workers.akyatbundok.com/api/public'}/mountains/search?query=pulag')
response = Net::HTTP.get(uri)
data = JSON.parse(response)

puts data`
  }
]

const useCases = [
  {
    title: 'Search Mountains by Name',
    description: 'Find mountains containing "pulag" in their name',
    endpoint: '/mountains/search?query=pulag'
  },
  {
    title: 'Search with Country Filter',
    description: 'Find mountains named "apo" in Philippines (PH)',
    endpoint: '/mountains/search?query=apo c:ph'
  },
  {
    title: 'Get Mountain Details',
    description: 'Retrieve complete information about a specific mountain',
    endpoint: '/mountains/mount-rainier-washington'
  }
]

export default function Examples() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <Head>
        <title>Code Examples - Akyat Bundok API</title>
        <meta
          name="description"
          content="Code examples and use cases for the Akyat Bundok API"
        />
      </Head>

      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Code Examples</h1>
          <p className="text-gray-300">
            Examples in multiple programming languages
          </p>
        </div>

        {/* Language Examples */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Language Examples
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedLanguage.name === lang.name
                    ? 'bg-brown-500 text-white'
                    : 'bg-main-400 text-gray-300 hover:bg-brown-500/50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          <div className="bg-main-400 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-main-500 border-b border-brown-500/30">
              <span className="text-gray-300 font-semibold">
                {selectedLanguage.name}
              </span>
              <button
                onClick={() => copyToClipboard(selectedLanguage.code)}
                className="text-brown-200 hover:text-brown-100 text-sm"
              >
                Copy
              </button>
            </div>
            <pre className="p-4 overflow-auto text-sm text-gray-300">
              {selectedLanguage.code}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}
