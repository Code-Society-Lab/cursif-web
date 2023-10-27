import '@styles/globals.css'
import '@styles/themes/dark.css'
import '@styles/themes/light.css'

import { ApolloWrapper } from "@/components/graphql/apollo-wrapper";
import DisclamerBanner from '@components/disclamer';
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
          <DisclamerBanner />
          {children}
        </body>
      </html>
    </ApolloWrapper>
  )
}
