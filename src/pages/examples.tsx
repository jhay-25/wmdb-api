import { useState } from 'react'
import Block from '@/components/Block'
import CodeBlock from '@/components/CodeBlock'
import MethodBadge from '@/components/MethodBadge'
import PageHeader from '@/components/PageHeader'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import { API_BASE_URL } from '@/data/endpoints'
import { structuredData } from '@/data/schema'

const languages = [
  {
    name: 'JavaScript',
    code: `const res = await fetch(
  '${API_BASE_URL}/mountains/search?q=pulag&limit=5'
)
const data = await res.json()

console.log(data.results)`
  },
  {
    name: 'Python',
    code: `import requests

res = requests.get(
    '${API_BASE_URL}/mountains/search',
    params={'q': 'pulag', 'limit': 5},
    timeout=20,
)

data = res.json()
for mountain in data['results']:
    print(mountain['name'], mountain['elevation_m'])`
  },
  {
    name: 'cURL',
    code: `curl "${API_BASE_URL}/mountains/search?q=pulag&limit=5"`
  },
  {
    name: 'PHP',
    code: `<?php
$url = '${API_BASE_URL}/mountains/search?q=pulag&limit=5';
$data = json_decode(file_get_contents($url), true);

foreach ($data['results'] as $mountain) {
    echo $mountain['name'], ' ', $mountain['elevation_m'], PHP_EOL;
}`
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
	res, err := http.Get("${API_BASE_URL}/mountains/search?q=pulag&limit=5")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	var data struct {
		Results []struct {
			Name       string \`json:"name"\`
			ElevationM *int   \`json:"elevation_m"\`
		} \`json:"results"\`
	}

	json.NewDecoder(res.Body).Decode(&data)
	fmt.Println(data.Results)
}`
  },
  {
    name: 'Ruby',
    code: `require 'net/http'
require 'json'

uri = URI('${API_BASE_URL}/mountains/search?q=pulag&limit=5')
data = JSON.parse(Net::HTTP.get(uri))

data['results'].each do |mountain|
  puts "#{mountain['name']} #{mountain['elevation_m']}"
end`
  }
]

const useCases = [
  {
    path: '/mountains/search?q=pulag',
    description: 'Find mountains with “pulag” in the name.'
  },
  {
    path: '/mountains/search?q=apo&country=PH',
    description: 'The same search, limited to the Philippines by ISO code.'
  },
  {
    path: '/mountains/nearby?lat=16.59772&lng=120.89875&radius=25000',
    description: 'Everything within 25 km of a point, nearest first.'
  },
  {
    path: '/mountains/in-bounds?north=17&south=16.2&east=121.2&west=120.6',
    description: 'A small viewport, for plotting on a map.'
  },
  {
    path: '/health',
    description: 'Check the service without touching the database.'
  }
]

export default function Examples() {
  const [selected, setSelected] = useState(languages[0])

  return (
    <>
      <Seo path="/examples" />
      <StructuredData data={structuredData('/examples')} />

      <PageHeader eyebrow="Cookbook" title="Mountain API examples" />

      <Block
        label={
          <h2 className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em]">
            {selected.name}
          </h2>
        }
      >
        <div className="flex flex-col gap-[18px] p-[18px]">
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language.name}
                type="button"
                onClick={() => setSelected(language)}
                aria-pressed={selected.name === language.name}
                className={`border-[1.5px] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                  selected.name === language.name
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink bg-paper text-ink hover:border-accent hover:text-accent'
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>

          <CodeBlock code={selected.code} copyable />
        </div>
      </Block>

      <Block label="Use cases" count={useCases.length}>
        <div className="grid gap-px bg-ink/25 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.path}
              className="flex flex-col gap-2 bg-paper p-[18px]"
            >
              <span className="flex items-center gap-3">
                <MethodBadge method="GET" />
                <code className="font-mono text-[0.85rem] font-bold break-all">
                  {useCase.path}
                </code>
              </span>
              <span className="text-[0.88rem] leading-[1.5] text-ink-soft">
                {useCase.description}
              </span>
            </div>
          ))}
        </div>
      </Block>
    </>
  )
}
