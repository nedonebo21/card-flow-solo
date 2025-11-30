import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Mutex } from 'async-mutex'

import { ACCESS_TOKEN } from '@/shared/constants'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
   credentials: 'include',
   prepareHeaders: headers => {
      const token = localStorage.getItem(ACCESS_TOKEN)

      if (token) {
         headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('API-KEY', import.meta.env.VITE_API_KEY)

      return headers
   },
})

export const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   await mutex.waitForUnlock()
   let result = await baseQuery(args, api, extraOptions)

   if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
         const release = await mutex.acquire()
         const refreshResult = await baseQuery(
            { url: '/v1/auth/refresh-token', method: 'POST' },
            api,
            extraOptions
         )

         if (refreshResult?.meta?.response?.status === 204) {
            result = await baseQuery(args, api, extraOptions)
         }

         release()
      } else {
         await mutex.waitForUnlock()
         result = await baseQuery(args, api, extraOptions)
      }
   }

   return result
}
