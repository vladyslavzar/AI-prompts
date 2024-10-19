


import '@/styles/global.css';

import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI Prompts',
  description: 'Discover & Share Ai Prompts',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          
          <main className="app">
            <Nav/>
            <Suspense >
              { children } 
            </Suspense>

          </main>
        </Provider>
      </body>
    </html>
  )
}
