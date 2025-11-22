import { Providers } from '@/app/providers/providers'
import { AppRouter } from '@/app/routing/app-router'

export const App = () => {
   return (
      <Providers>
         <AppRouter />
      </Providers>
   )
}
