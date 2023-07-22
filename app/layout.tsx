import { Footer, Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: `Carhub`,
  description: 'Find, book, or rent a car -- quickly and easily!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/emmysfav.png" />
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
