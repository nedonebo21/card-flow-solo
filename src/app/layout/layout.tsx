import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header/ui'

export const Layout = () => {
   return (
      <>
         <Header />
         <main className={'container'}>
            <Outlet />
         </main>
      </>
   )
}
