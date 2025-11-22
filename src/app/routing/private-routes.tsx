import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import { useMeQuery } from '@/entities/user/api/user-api'

export const PrivateRoutes = () => {
   const { isLoading, isError } = useMeQuery()
   const navigate = useNavigate()

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      navigate('/sign-in')
   }

   const isAuth = !isError

   return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} />
}
