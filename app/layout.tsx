
import type { Metadata } from 'next'

import {siteConfig} from '@/config/site'
import ReduxProvider from '@/providers/ReduxProvider'
import ToastProvider from '@/providers/ToastProvider'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ModalManager from '@/components/ui/modals/ModalManager'
import '@/styles/globals.css'


export const metadata: Metadata = {

  title: siteConfig.title,

  description: siteConfig.description,

  authors: [
    {
      name: "Shubhankar Chakraborty",
      url: "https://github.com/someuser",
    },
  ],
  creator: "Shubhankar Chakraborty",

  icons: {
    icon: "/icon.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      >
       <NextAuthProvider>
        <ReduxProvider>
          <ModalManager />
          {children}
        </ReduxProvider>
        <ToastProvider />
       </NextAuthProvider>
      </body>
    </html>
  )
}
