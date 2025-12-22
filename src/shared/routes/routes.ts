export const ROUTE_PATHS = {
   SIGN_IN: '/sign-in',
   SIGN_UP: '/sign-up',
   FORGOT_PASSWORD: '/forgot-password',
   CREATE_NEW_PASSWORD: '/create-new-password/:token',
   VERIFY_EMAIL: '/verify-email',

   HOME: '/',
   DECKS: '/decks',
   DECKS_BY_ID: '/decks/:id',
   LEARN: '/decks/:id/learn',
   PROFILE: '/profile',
   ERROR_404: '/*',
} as const
