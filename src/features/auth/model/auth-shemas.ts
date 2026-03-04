import type { TFunction } from 'i18next'

import { z } from 'zod'

const MIN_LENGTH = 3

export const emailSchema = (t: TFunction) =>
   z.email(t('features.auth.errors.enter-valid-email')).trim()
export const passwordSchema = (t: TFunction) =>
   z
      .string()
      .min(
         MIN_LENGTH,
         `${t('features.auth.errors.password-must-longer')} ${MIN_LENGTH} ${t('features.auth.errors.characters')}`
      )
      .refine(pass => pass === pass.trim(), t('features.auth.errors.pass-contains-spaces'))
