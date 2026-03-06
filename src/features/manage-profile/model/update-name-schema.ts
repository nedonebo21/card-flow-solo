import type { TFunction } from 'i18next'

import { z } from 'zod'

const MAX_LENGTH = 15

export const updateNameSchema = (t: TFunction) =>
   z.object({
      name: z
         .string()
         .max(
            MAX_LENGTH,
            `${t('features.manage-profile.errors.nickname-must-less')} ${MAX_LENGTH} ${t('features.manage-profile.errors.characters')}`
         ),
   })

export type UpdateNameFormValues = z.infer<ReturnType<typeof updateNameSchema>>
