import type { User } from '@/entities/user'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      me: builder.query<User, void>({
         query: () => `v1/auth/me`,
         providesTags: ['Me'],
      }),
   }),
})

export const { useMeQuery } = userApi
