import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { PrivateRoutes } from '@/app/routing/private-routes'
import { SignIn } from '@/pages/auth/ui/sign-in/sign-in'
import { SignUp } from '@/pages/auth/ui/sign-up/sign-up'

const publicRoutes: RouteObject[] = [
   {
      path: '/sign-in',
      element: <SignIn />,
   },
   {
      path: '/sign-up',
      element: <SignUp />,
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
