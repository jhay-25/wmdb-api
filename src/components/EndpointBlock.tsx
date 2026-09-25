import { API_BASE_URL, endpointId, type Endpoint } from '@/data/endpoints'
import Block from './Block'
import CodeBlock from './CodeBlock'
import MethodBadge from './MethodBadge'
import Table from './Table'

export default function EndpointBlock({ endpoint }: { endpoint: Endpoint }) {
  return (
    <Block
      id={endpointId(endpoint.path)}
      label={
        <>
          <MethodBadge method={endpoint.method} />
          <code className="font-mono text-[0.95rem] font-bold tracking-[-0.01em]">
            {endpoint.path}
          </code>
        </>
      }
    >
      <div className="flex flex-col gap-[18px] p-[18px]">
        <p className="max-w-[72ch] text-[0.98rem] leading-[1.6] text-ink/90">
          {endpoint.summary}
        </p>

        {endpoint.params.length > 0 && (
          <Table
            caption={`${endpoint.path} query parameters`}
            head={['Parameter', 'Type', 'Default', 'Notes']}
            rows={endpoint.params.map((param) => [
              <code className="font-mono" key="name">
                {param.name}
              </code>,
              param.type,
              param.default ?? '—',
              <>
                {param.description}
                {param.required && (
                  <span className="ml-2 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-accent">
                    required
                  </span>
                )}
              </>
            ])}
          />
        )}

        <CodeBlock
          label="Request"
          code={`curl "${API_BASE_URL}${endpoint.path}${endpoint.exampleQuery}"`}
          copyable
        />

        <CodeBlock
          label="200 OK"
          code={JSON.stringify(endpoint.response, null, 2)}
          copyable
        />

        {endpoint.notes.length > 0 && (
          <ul className="flex flex-col gap-2">
            {endpoint.notes.map((note) => (
              <li
                key={note}
                className="border-l-[1.5px] border-accent pl-3 text-[0.88rem] leading-[1.5] text-ink-soft"
              >
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Block>
  )
}
