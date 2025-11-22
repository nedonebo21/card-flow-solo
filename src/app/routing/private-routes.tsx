import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/entities/user'

export const PrivateRoutes = () => {
   const { isLoading, isError } = useMeQuery()

   if (isLoading) {
      return <div>Loading...</div>
   }

   const isAuth = !isError

   return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} replace />
}
