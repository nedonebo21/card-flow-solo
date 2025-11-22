import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { PrivateRoutes } from '@/app/routing/private-routes'
import { SignIn } from '@/pages/auth/ui/sign-in/sign-in'

const publicRoutes: RouteObject[] = [
   {
      path: '/sign-in',
      element: <SignIn />,
   },
]

const privateRoutes: RouteObject[] = [
   {
      path: '/',
      element: <div>Hello</div>,
   },
]

export const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            element: <PrivateRoutes />,
            children: privateRoutes,
         },
         ...publicRoutes,
      ],
   },
])
