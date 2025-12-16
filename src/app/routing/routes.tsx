import type { RouteObject } from 'react-router-dom'

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { PrivateRoutes } from '@/app/routing/private-routes'
import { Cards } from '@/pages/cards'
import { CreateNewPassword } from '@/pages/create-new-password'
import { Decks } from '@/pages/decks'
import { Error404 } from '@/pages/error-404'
import { ForgotPassword } from '@/pages/forgot-password'
import { Learn } from '@/pages/learn'
import { Profile } from '@/pages/profile'
import { SignIn } from '@/pages/sign-in'
import { SignUp } from '@/pages/sign-up'
import { VerifyEmail } from '@/pages/verify-email'
import { ROUTE_PATHS } from '@/shared/constants'

const publicRoutes: RouteObject[] = [
   {
      path: ROUTE_PATHS.SIGN_IN,
      element: <SignIn />,
   },
   {
      path: ROUTE_PATHS.SIGN_UP,
      element: <SignUp />,
   },
   {
      path: ROUTE_PATHS.FORGOT_PASSWORD,
      element: <ForgotPassword />,
   },
   {
      path: ROUTE_PATHS.CREATE_NEW_PASSWORD,
      element: <CreateNewPassword />,
   },
   {
      path: ROUTE_PATHS.ERROR_404,
      element: <Error404 />,
   },
]

const privateRoutes: RouteObject[] = [
   {
      path: ROUTE_PATHS.HOME,
      element: <Navigate to={ROUTE_PATHS.DECKS} />,
   },
   {
      path: ROUTE_PATHS.DECKS,
      element: <Decks />,
   },
   {
      path: ROUTE_PATHS.DECKS_BY_ID,
      element: <Cards />,
   },
   {
      path: ROUTE_PATHS.LEARN,
      element: <Learn />,
   },
   {
      path: ROUTE_PATHS.PROFILE,
      element: <Profile />,
   },
   {
      path: ROUTE_PATHS.VERIFY_EMAIL,
      element: <VerifyEmail />,
   },
   {
      path: ROUTE_PATHS.ERROR_404,
      element: <Error404 />,
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
