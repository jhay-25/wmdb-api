import { ReactNode } from 'react'
import Nav from './Nav'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-paper font-apfel text-ink">
      <div className="mx-auto flex min-h-screen w-full max-w-[1300px] flex-col gap-[18px] px-6">
        <Nav />
        <main className="flex flex-1 flex-col gap-[18px] pb-[18px]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
