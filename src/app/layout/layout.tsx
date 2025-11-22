import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header'

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
