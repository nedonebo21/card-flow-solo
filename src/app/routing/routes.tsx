import type { RouteObject } from 'react-router-dom'

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { PrivateRoutes } from '@/app/routing/private-routes'
import { CreateNewPassword } from '@/pages/auth/ui/create-new-password/create-new-password'
import { ForgotPassword } from '@/pages/auth/ui/forgot-password/forgot-password'
import { SignIn } from '@/pages/auth/ui/sign-in/sign-in'
import { SignUp } from '@/pages/auth/ui/sign-up/sign-up'
import { Cards } from '@/pages/cards/ui/cards'
import { Decks } from '@/pages/decks/ui/decks/decks'
import { Learn } from '@/pages/learn/ui/learn'

const publicRoutes: RouteObject[] = [
   {
      path: '/sign-in',
      element: <SignIn />,
   },
   {
      path: '/sign-up',
      element: <SignUp />,
   },
   {
      path: '/forgot-password',
      element: <ForgotPassword />,
   },
   {
      path: '/create-new-password/:token',
      element: <CreateNewPassword />,
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
   {
      path: '/decks/:id',
      element: <Cards />,
   },
   {
      path: '/decks/:id/learn',
      element: <Learn />,
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
