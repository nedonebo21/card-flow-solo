export type AuthResponse = {
   accessToken: string
   refreshToken: string
}

export type RecoverArgs = {
   email: string
   subject?: string
   html?: string
}

export type SendVerifyEmailArgs = {
   userId: string
   subject?: string
   html?: string
}

export type ResetPasswordArgs = {
   password: string
   token: string
}
