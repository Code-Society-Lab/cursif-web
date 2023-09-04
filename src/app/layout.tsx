import '@styles/globals.css'
import '@styles/themes/dark.css'
import '@styles/themes/light.css'

import { ApolloWrapper } from "@/components/graphql/apollo-wrapper";
import { StoreProvider } from "@/stores/store-provider";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Cursif',
  description: 'Taking note should be fast and simple!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <html lang="en">
        <body className="min-w-[350px]">
          {children}
        </body>
      </html>
    </ApolloWrapper>
  )
}
