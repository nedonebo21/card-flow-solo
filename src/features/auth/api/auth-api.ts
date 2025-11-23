import type { SignInFormValues, SignUpFormValues } from '@/features/auth/model'

import { baseApi } from '@/shared/api'

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
      signUp: builder.mutation<void, Omit<SignUpFormValues, 'confirm'>>({
         query: body => ({
            body,
            method: 'POST',
            url: `v1/auth/sign-up`,
         }),
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useSignInMutation, useSignUpMutation } = authApi
