import Link from 'next/link'
import Block from '@/components/Block'
import CodeBlock from '@/components/CodeBlock'
import MethodBadge from '@/components/MethodBadge'
import PageHeader from '@/components/PageHeader'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import Table from '@/components/Table'
import { API_BASE_URL, endpoints } from '@/data/endpoints'
import { structuredData } from '@/data/schema'

const conventions = [
  {
    label: 'No key',
    body: 'Every route is public and read-only. No authentication and no API key.'
  },
  {
    label: 'Pagination',
    body: 'List endpoints take limit (1–50, default 20) and offset, and report has_more. Out-of-range values are clamped.'
  },
  {
    label: 'Cross-origin',
    body: 'Responses allow any origin, so you can call the API from a browser.'
  },
  {
    label: 'Methods and paths',
    body: 'Only GET is supported. Trailing slashes matter: /api works, /api/ does not.'
  }
]

export default function Overview() {
  return (
    <>
      <Seo path="/" />
      <StructuredData data={structuredData('/')} />

      <PageHeader
        eyebrow="World Mountain Database · WMDB"
        title="Mountain API"
        intro="A JSON API for the World Mountain Database. Search mountains by name, find the ones around a coordinate, or pull everything inside a map view."
      />

      <Block label="Quick start">
        <div className="flex flex-col gap-[18px] p-[18px]">
          <div className="flex flex-col gap-2">
            <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-ink-soft -mb-6">
              Base URL
            </span>
            <CodeBlock code={API_BASE_URL} copyable />
          </div>
        </div>
      </Block>

      <Block label="Endpoints" count={endpoints.length}>
        <div className="grid gap-px bg-ink/25 sm:grid-cols-2">
          {endpoints.map((endpoint) => (
            <Link
              key={endpoint.path}
              href="/endpoints"
              className="group flex flex-col gap-2 bg-paper p-[18px] transition-colors hover:text-accent"
            >
              <span className="flex items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="font-mono text-[0.95rem] font-bold tracking-[-0.01em]">
                  {endpoint.path}
                </code>
              </span>
              <span className="text-[0.88rem] leading-[1.5] text-ink-soft transition-colors group-hover:text-accent">
                {endpoint.summary}
              </span>
            </Link>
          ))}
        </div>
      </Block>
    </>
  )
}
