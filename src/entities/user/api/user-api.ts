import type { User } from '../model/user.types'

import { baseApi } from '@/shared/api'

export const userApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      me: builder.query<User, void>({
         query: () => `v1/auth/me`,
         providesTags: ['Me'],
      }),
      updateUser: builder.mutation<User, { name?: string; avatar?: File }>({
         query: body => {
            const formData = new FormData()

            if (body.name) {
               formData.append('name', body.name)
            }

            if (body.avatar) {
               formData.append('avatar', body.avatar)
            }

            return {
               method: 'PATCH',
               url: 'v1/auth/me',
               body: formData,
            }
         },
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useMeQuery, useUpdateUserMutation } = userApi
