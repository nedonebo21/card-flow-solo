import type { ReactNode } from 'react'

import { Provider } from 'react-redux'

import { Toaster } from 'sonner'

import '../lib/i18n.types'
import '../../app/lib/i18n'

import { store } from '../store/store'

export const Providers = ({ children }: { children: ReactNode }) => {
   return (
      <Provider store={store}>
         {children} <Toaster theme={'dark'} />
      </Provider>
   )
}
