import { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-main-500">
      <Nav />
      <main className="flex-grow mx-auto max-w-[950px] w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
