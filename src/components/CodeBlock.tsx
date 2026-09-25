import { useState } from 'react'

interface CodeBlockProps {
  label?: string
  code: string
  copyable?: boolean
}

export default function CodeBlock({
  label,
  code,
  copyable = false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="flex flex-col">
      {(label || copyable) && (
        <div className="flex items-center justify-between gap-3 pb-2">
          <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-ink-soft">
            {label}
          </span>
          {copyable && (
            <button
              type="button"
              onClick={copy}
              className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-accent"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto border-[1.5px] border-ink bg-paper p-[14px_16px] font-mono text-[0.78rem] leading-[1.6]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  )
}
