import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/entities/user/api'
import { LoaderIcon } from '@/shared/ui'

export const PrivateRoutes = () => {
   const { isLoading, isError } = useMeQuery()

   if (isLoading) {
      return (
         <div
            style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: '100vw',
               height: '100vh',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <LoaderIcon width={44} height={44} />
         </div>
      )
   }

   const isAuth = !isError

   return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} replace />
}
