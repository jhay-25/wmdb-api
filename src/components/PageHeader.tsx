import { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  intro?: ReactNode
}

export default function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="border-[1.5px] border-ink bg-paper px-[18px] py-[22px]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          {eyebrow && (
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-ink-soft">
              {eyebrow}
            </span>
          )}
          <h1 className="text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">
            {title}
          </h1>
        </div>
        {intro && (
          <p className="max-w-[68ch] text-[1.02rem] leading-[1.6] text-ink/90">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
