import { ReactNode } from 'react'

interface BlockProps {
  label?: ReactNode
  count?: string | number
  id?: string
  children: ReactNode
}

// Bordered paper block with the site's uppercase section label, reversed out of
// an ink header so the label reads as chrome rather than part of the body.
export default function Block({ label, count, id, children }: BlockProps) {
  return (
    <section id={id} className="border-[1.5px] border-ink bg-paper">
      {label && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-ink px-[18px] pb-3.5 pt-4 text-paper">
          {typeof label === 'string' ? (
            <h2 className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em]">
              {label}
            </h2>
          ) : (
            label
          )}
          {count != null && (
            <span className="text-[0.78rem] font-bold uppercase tabular-nums tracking-[0.1em] text-paper/70">
              {count}
            </span>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
