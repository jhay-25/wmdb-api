export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-[18px] gap-y-2 border-[1.5px] border-ink px-[18px] py-[14px] text-xs uppercase tracking-[0.2em] text-ink-soft">
      <span>© {new Date().getFullYear()} World Mountain Database</span>
      <nav className="flex flex-wrap gap-[18px]" aria-label="Footer">
        <a
          className="normal-case tracking-normal transition-colors hover:text-accent"
          href="https://codingjohn.dev"
        >
          codingjohn.dev
        </a>
        <a
          className="normal-case tracking-normal transition-colors hover:text-accent"
          href="https://akyatbundok.com"
        >
          akyatbundok.com
        </a>
      </nav>
    </footer>
  )
}
