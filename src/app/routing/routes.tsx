import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { PrivateRoutes } from '@/app/routing/private-routes'

const publicRoutes: RouteObject[] = [
   {
      path: '/login',
      element: <div>Login</div>,
   },
]

const privateRoutes: RouteObject[] = [
   {
      path: '/',
      element: <div>Hello</div>,
   },
]

export const router = createBrowserRouter([
   { element: <PrivateRoutes />, children: privateRoutes },
   ...publicRoutes,
])
