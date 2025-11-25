import type { AuthResponse, SignInFormValues, SignUpFormValues } from '../model'

import { baseApi } from '@/shared/api'

export const authApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      signIn: builder.mutation<AuthResponse, SignInFormValues>({
         query: body => ({
            body,
            method: 'POST',
            url: `v1/auth/login`,
         }),
         async onQueryStarted(_, { queryFulfilled }) {
            try {
               const { data } = await queryFulfilled

               localStorage.setItem('accessToken', data?.accessToken)
            } catch (error) {
               console.error(error)
            }
         },
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
      logout: builder.mutation<unknown, void>({
         query: () => ({
            method: 'POST',
            url: `v1/auth/logout`,
         }),
         async onQueryStarted(_, { queryFulfilled }) {
            try {
               await queryFulfilled

               localStorage.removeItem('accessToken')
            } catch (error) {
               console.error(error)
            }
         },
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useSignInMutation, useSignUpMutation, useLogoutMutation } = authApi
