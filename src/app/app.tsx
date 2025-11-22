import { Providers } from '@/app/providers/providers'
import { AppRouter } from '@/app/routing/app-router'
import { SignIn } from '@/pages/auth/ui/sign-in/sign-in'

export const App = () => {
   return (
      <Providers>
         <AppRouter />
         <SignIn />
      </Providers>
   )
}
