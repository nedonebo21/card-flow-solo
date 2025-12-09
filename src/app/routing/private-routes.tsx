import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/entities/user/api'
import { ROUTE_PATHS } from '@/shared/constants'
import { Loader } from '@/shared/ui'

export const PrivateRoutes = () => {
   const { isLoading, isError } = useMeQuery()

   if (isLoading) {
      return <Loader />
   }

   const isAuth = !isError

   return isAuth ? <Outlet /> : <Navigate to={ROUTE_PATHS.SIGN_IN} replace />
}
