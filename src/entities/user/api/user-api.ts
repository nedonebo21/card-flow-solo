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
         onQueryStarted: async ({ name, avatar }, { dispatch, queryFulfilled }) => {
            const patchResult = dispatch(
               userApi.util.updateQueryData('me', undefined, (draft: User) => {
                  if (name !== undefined) {
                     draft.name = name
                  }
                  if (avatar) {
                     draft.avatar = URL.createObjectURL(avatar)
                  }
                  draft.updated = new Date().toISOString()
               })
            )

            try {
               await queryFulfilled
            } catch {
               patchResult.undo()
            }
         },
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useMeQuery, useUpdateUserMutation } = userApi
