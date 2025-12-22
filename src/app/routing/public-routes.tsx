import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/entities/user'
import { ROUTE_PATHS } from '@/shared/routes'
import { Loader } from '@/shared/ui'

export const PublicRoutes = () => {
   const { isLoading, isError } = useMeQuery()

   if (isLoading) {
      return <Loader />
   }

   const isAuth = !isError

   return isAuth ? <Navigate to={ROUTE_PATHS.HOME} replace /> : <Outlet />
}
