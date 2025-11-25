import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { PrivateRoutes } from '@/app/routing/private-routes'
import { SignIn } from '@/pages/auth/ui/sign-in/sign-in'
import { SignUp } from '@/pages/auth/ui/sign-up/sign-up'
import { Decks } from '@/pages/decks/ui/decks/decks'

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
      element: <Navigate to={'/decks'} />,
   },
   {
      path: '/decks',
      element: <Decks />,
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
