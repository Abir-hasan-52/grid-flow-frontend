/** biome-ignore-all assist/source/organizeImports: <explanation> */

import type { ReactNode } from 'react'
import Header from '@/components/layout/public/Header';
import Footer from '@/components/layout/public/Footer';


export default function layout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
       <main className="flex-1">
         {children}
       </main>
       <Footer />
    </div>
  )
}
