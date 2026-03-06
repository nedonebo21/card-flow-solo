import type { TFunction } from 'i18next'

import { z } from 'zod'

import { VALID_FILE_FORMATS } from '@/shared/constants'

const MAX_SIZE = {
   value: 10 * 1024 * 1024,
   label: '10 MB',
}

export const updateAvatarSchema = (t: TFunction) =>
   z.object({
      avatar: z
         .custom<File>(file => file instanceof File, {
            message: t('features.manage-profile.errors.image-required'),
         })
         .refine(
            file => VALID_FILE_FORMATS.values.includes(file.type),
            `${t('features.manage-profile.errors.select-image')} (${VALID_FILE_FORMATS.labels})`
         )
         .refine(
            file => file.size <= MAX_SIZE.value,
            `${t('features.manage-profile.errors.avatar-size')} ${MAX_SIZE.label}`
         ),
   })

export type UpdateAvatarFormValues = z.infer<ReturnType<typeof updateAvatarSchema>>
