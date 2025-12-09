import type {
   AuthResponse,
   RecoverArgs,
   ResetPasswordArgs,
   SendVerifyEmailArgs,
} from '../model/auth.types'
import type { SignInFormValues } from '../model/sign-in-schema'
import type { SignUpFormValues } from '../model/sign-up-schema'

import { baseApi } from '@/shared/api'
import { ACCESS_TOKEN } from '@/shared/constants'

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

               localStorage.setItem(ACCESS_TOKEN, data?.accessToken)
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

               localStorage.removeItem(ACCESS_TOKEN)
            } catch (error) {
               console.error(error)
            }
         },
         invalidatesTags: ['Me'],
      }),
      recoverPassword: builder.mutation<unknown, RecoverArgs>({
         query: body => ({
            method: 'POST',
            url: '/v1/auth/recover-password',
            body,
         }),
         invalidatesTags: ['Me'],
      }),
      resetPassword: builder.mutation<unknown, ResetPasswordArgs>({
         query: ({ password, token }) => ({
            method: 'POST',
            url: `/v1/auth/reset-password/${token}`,
            body: { password },
         }),
         invalidatesTags: ['Me'],
      }),
      sendVerifyEmail: builder.mutation<unknown, SendVerifyEmailArgs>({
         query: body => {
            return {
               method: 'POST',
               url: 'v1/auth/resend-verification-email',
               body,
            }
         },
      }),
      verifyEmail: builder.mutation<unknown, { code: string }>({
         query: body => {
            return {
               method: 'POST',
               url: 'v1/auth/verify-email',
               body,
            }
         },
      }),
   }),
})

export const {
   useSignInMutation,
   useSignUpMutation,
   useLogoutMutation,
   useRecoverPasswordMutation,
   useResetPasswordMutation,
   useSendVerifyEmailMutation,
   useVerifyEmailMutation,
} = authApi
