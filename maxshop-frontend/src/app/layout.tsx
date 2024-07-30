import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Header from '@/components/Pages/Header'
import Footer from '@/components/Pages/Footer'
import ShopWrapper from '@/components/Pages/ShopWrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Триал-Спорт',
  description: 'Триал-Спорт - магазин спортивных товаров',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} text-gray-900 antialiased`}>
        <div className="flex min-h-screen flex-col justify-between bg-gray-100">
          <Header />
          <ShopWrapper>
            <main>{children}</main>
          </ShopWrapper>
          <ToastContainer />
          <Footer />
        </div>
      </body>
    </html>
  )
}
