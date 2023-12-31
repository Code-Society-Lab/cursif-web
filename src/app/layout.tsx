import '@styles/globals.css'
import '@styles/themes/dark.css'
import '@styles/themes/light.css'

import { ApolloWrapper } from "@/components/graphql/apollo-wrapper";
import WarningBanner from '@/components/warning-banner';
import type { Metadata } from 'next'
import Config from '@/config';

export const metadata: Metadata = {
  title: 'Cursif',
  description: 'Taking note should be fast and simple!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <html lang="en">
        <body className="min-w-[350px]">
          <WarningBanner if={Config.production()}>
            <>
              Cursif is currently under heavy <b>development</b>.
              Data loss could occur.
              Please use at your own risk. <a href="https://github.com/Code-Society-Lab/cursif" className="underline text-blue-600"><b>Read more</b></a>
            </>
          </WarningBanner>

          <WarningBanner if={Config.development()}>
            You are currently in <b>development!</b>
          </WarningBanner>
          {children}
        </body>
      </html>
    </ApolloWrapper>
  )
}
