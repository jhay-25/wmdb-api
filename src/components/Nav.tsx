import Link from 'next/link'
import { useRouter } from 'next/router'

const navItems = [
  { name: 'Overview', path: '/' },
  { name: 'Endpoints', path: '/endpoints' },
  { name: 'Examples', path: '/examples' },
  { name: 'Explorer', path: '/api-explorer' }
]

export default function Nav() {
  const router = useRouter()

  return (
    <header className="relative flex flex-col items-start justify-between gap-2 border-x-[1.5px] border-b-[1.5px] border-ink px-[18px] py-[14px] sm:flex-row sm:items-center sm:gap-3">
      <Link href="/" className="flex items-baseline gap-2.5">
        <span className="text-[1.05rem] font-extrabold uppercase tracking-[4px] text-ink">
          wmdb
        </span>
      </Link>

      <nav
        className="flex flex-wrap items-center gap-x-[18px] gap-y-1 text-[14px] font-bold uppercase tracking-[0.14em]"
        aria-label="Documentation"
      >
        {navItems.map((item) => {
          const active = router.pathname === item.path

          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={active ? 'page' : undefined}
              className={
                active
                  ? 'text-accent'
                  : 'text-ink-soft transition-colors hover:text-accent'
              }
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
