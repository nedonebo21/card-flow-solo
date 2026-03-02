import type { ReactNode } from 'react'

import { Provider } from 'react-redux'

import { Toaster } from 'sonner'

import '../../shared/lib/i18n/i18n.types'
import '../../shared/lib/i18n/i18n'

import { store } from '../store/store'

export const Providers = ({ children }: { children: ReactNode }) => {
   return (
      <Provider store={store}>
         {children} <Toaster theme={'dark'} />
      </Provider>
   )
}
