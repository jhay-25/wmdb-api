import Link from 'next/link'

const navigation = {
  main: [
    // { name: 'Privacy', href: '/privacy' },
    // { name: 'Terms', href: '/terms' }
  ]
}

function Footer() {
  return (
    <footer className="bg-main-500 mx-auto w-full">
      <div className="overflow-hidden px-4 py-6">
        {/* <nav
          className="flex flex-wrap justify-center gap-4"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="text-lg leading-6 font-bold text-white hover:text-gray-300"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex justify-center my-4">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div> */}

        <p className="font-semibold text-center text-base leading-5 text-white mt-4">
          &copy; 2023-{new Date().getFullYear()}{' '}
          <Link className="underline" href={'/'}>
            Akyat Bundok
          </Link>{' '}
          . All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
