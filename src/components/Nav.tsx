import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Nav() {
  const router = useRouter()

  const isActive = (path: string) => {
    return router.pathname === path
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'API Explorer', path: '/api-explorer' },
    { name: 'Endpoints', path: '/endpoints' },
    { name: 'Examples', path: '/examples' }
  ]

  return (
    <nav className="bg-main-400 text-white shadow-lg sticky top-0 z-50 border-b border-brown-500/20">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Mountain Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-lg">WMDB API</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-brown-500 text-white'
                    : 'text-gray-300 hover:bg-brown-500/50 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* <a
            href="https://akyatbundok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-brown-500 hover:bg-brown-600 rounded-md transition-colors"
          >
            <span>Main Site</span>
          </a> */}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-brown-500 text-white'
                  : 'text-gray-300 hover:bg-brown-500/50 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
