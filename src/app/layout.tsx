'use client'
import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'
import { Provider } from '@service/provider'
import { LanguageProvider } from '@/service/language'
import { Preloader } from '@/modules/preloader'


const actay = localFont({
  src: [
    {
      path: './fonts/ActayWide-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-act'
})

const esqadero = localFont({
  src: [
    {
      path: './fonts/Esqadero FF CY 4F-Regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-esq'
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${actay.variable} ${esqadero.variable}`}>
        <Provider>
          <LanguageProvider>
            <Preloader />
            <div id="root">
              <Header />
              {children}
              <Footer />
            </div>

            <div id="modal-root" />
          </LanguageProvider>
        </Provider>
      </body>
    </html>
  )
}
