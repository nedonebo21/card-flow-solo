import { Outlet } from 'react-router-dom'

import { clsx } from 'clsx'

import { Header } from '@/widgets/header'

export const Layout = () => {
   return (
      <>
         <Header />
         <main className={clsx('container', 'margin-bottom')}>
            <Outlet />
         </main>
      </>
   )
}
