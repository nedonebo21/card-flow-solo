import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/routing/routes'

export const AppRouter = () => {
   return <RouterProvider router={router} />
}
