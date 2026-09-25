import { useMemo, useState } from 'react'
import Block from '@/components/Block'
import CodeBlock from '@/components/CodeBlock'
import MethodBadge from '@/components/MethodBadge'
import PageHeader from '@/components/PageHeader'
import Seo from '@/components/Seo'
import StructuredData from '@/components/StructuredData'
import { API_BASE_URL, endpoints, type Endpoint } from '@/data/endpoints'
import { structuredData } from '@/data/schema'

const initialEndpoint =
  endpoints.find((endpoint) => endpoint.path === '/mountains/search') ??
  endpoints[0]

export default function ApiExplorer() {
  const [selected, setSelected] = useState<Endpoint>(initialEndpoint)
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<number | null>(null)
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const url = useMemo(() => {
    const query = selected.params
      .map((param) => [param.name, (values[param.name] ?? '').trim()] as const)
      .filter(([, value]) => value !== '')
      .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
      .join('&')

    return `${API_BASE_URL}${selected.path}${query ? `?${query}` : ''}`
  }, [selected, values])

  const select = (endpoint: Endpoint) => {
    setSelected(endpoint)
    setValues({})
    setStatus(null)
    setBody('')
  }

  const useExample = () => {
    const filled: Record<string, string> = {}
    new URLSearchParams(selected.exampleQuery).forEach((value, name) => {
      filled[name] = value
    })
    setValues(filled)
  }

  const send = async () => {
    setLoading(true)
    setStatus(null)
    setBody('')

    try {
      const res = await fetch(url)
      const text = await res.text()

      setStatus(res.status)

      // Errors come back as plain text, so only parse when the body is JSON.
      try {
        setBody(JSON.stringify(JSON.parse(text), null, 2))
      } catch {
        setBody(text)
      }
    } catch (error) {
      setBody(error instanceof Error ? error.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo path="/api-explorer" />
      <StructuredData data={structuredData('/api-explorer')} />

      <PageHeader eyebrow="Try it" title="Mountain API explorer" />

      <div className="grid gap-[18px] lg:grid-cols-[300px_1fr]">
        <Block label="Endpoints">
          <div className="flex flex-col">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.path}
                type="button"
                onClick={() => select(endpoint)}
                aria-pressed={selected.path === endpoint.path}
                className={`flex items-center gap-3 border-b border-ink/25 px-[18px] py-3.5 text-left transition-colors last:border-b-0 ${
                  selected.path === endpoint.path
                    ? 'text-accent'
                    : 'hover:text-accent'
                }`}
              >
                <MethodBadge method={endpoint.method} />
                <code className="font-mono text-[0.82rem] font-bold break-all">
                  {endpoint.path}
                </code>
              </button>
            ))}
          </div>
        </Block>

        <div className="flex flex-col gap-[18px]">
          <Block label="Parameters">
            <div className="flex flex-col gap-[18px] p-[18px]">
              {selected.params.length === 0 ? (
                <p className="text-[0.95rem] text-ink-soft">
                  This endpoint takes no parameters.
                </p>
              ) : (
                <div className="flex flex-col gap-3.5">
                  {selected.params.map((param) => (
                    <label key={param.name} className="flex flex-col gap-1.5">
                      <span className="flex flex-wrap items-baseline gap-x-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-ink-soft">
                        <code className="font-mono text-[0.78rem] text-ink">
                          {param.name}
                        </code>
                        {param.required && (
                          <span className="text-accent">required</span>
                        )}
                        <span className="font-bold normal-case tracking-normal">
                          {param.type}
                        </span>
                      </span>
                      <input
                        type="text"
                        inputMode={
                          param.type.includes('number') ? 'decimal' : 'text'
                        }
                        placeholder={param.default ?? param.description}
                        value={values[param.name] ?? ''}
                        onChange={(event) =>
                          setValues({
                            ...values,
                            [param.name]: event.target.value
                          })
                        }
                        className="border-[1.5px] border-ink bg-paper px-3.5 py-2 text-[0.9rem] font-medium placeholder:text-ink-soft focus:border-accent"
                      />
                    </label>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={send}
                  disabled={loading}
                  className="border-[1.5px] border-ink bg-ink px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-paper transition-colors hover:border-accent hover:bg-accent disabled:opacity-40"
                >
                  {loading ? 'Sending…' : 'Send request'}
                </button>
                {selected.exampleQuery !== '' && (
                  <button
                    type="button"
                    onClick={useExample}
                    className="border-[1.5px] border-ink px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
                  >
                    Fill example
                  </button>
                )}
              </div>
            </div>
          </Block>

          <Block label="Request">
            <div className="p-[18px]">
              <CodeBlock code={url} copyable />
            </div>
          </Block>

          {(body || status !== null) && (
            <Block
              label={status !== null ? `Response · ${status}` : 'Response'}
            >
              <div className="p-[18px]">
                <CodeBlock code={body || 'No content'} />
              </div>
            </Block>
          )}
        </div>
      </div>
    </>
  )
}
