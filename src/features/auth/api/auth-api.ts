import type { SignInFormValues } from '../model/sign-in-schema'

import { baseApi } from '@/shared/api/base-api'

export const authApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      signIn: builder.mutation<void, SignInFormValues>({
         query: body => ({
            body,
            method: 'POST',
            url: `v1/auth/login`,
         }),
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useSignInMutation } = authApi
