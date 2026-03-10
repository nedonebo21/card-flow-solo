import type { TFunction } from 'i18next'

import { z } from 'zod'

import { VALID_FILE_FORMATS } from '@/shared/constants'

const MAX_SIZE = {
   value: 10 * 1024 * 1024,
   label: '10 MB',
}

export const deckFormSchema = (t: TFunction) =>
   z.object({
      cover: z
         .custom<File>(file => file instanceof File, {
            message: t('features.manage-decks.errors.image-required'),
         })
         .refine(
            file => VALID_FILE_FORMATS.values.includes(file.type),
            `${t('features.manage-decks.errors.image-file')} (${VALID_FILE_FORMATS.labels})`
         )
         .refine(
            file => file.size <= MAX_SIZE.value,
            `${t('features.manage-decks.errors.image-size')} ${MAX_SIZE.label}`
         )
         .optional(),
      name: z.string().min(1, t('features.manage-decks.errors.name-required')),
      isPrivate: z.boolean().optional(),
   })

export type DeckFormValues = z.infer<ReturnType<typeof deckFormSchema>>
