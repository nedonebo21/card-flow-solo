import { z } from 'zod'

const FILE_FORMATS = ['jpeg', 'jpg', 'png', 'webp']

export const VALID_FILE_FORMATS = {
   labels: FILE_FORMATS.join(', ').toUpperCase(),
   values: FILE_FORMATS.map(format => `image/${format}`),
}
const MAX_SIZE = {
   value: 10 * 1024 * 1024,
   label: '10 MB',
}

export const updateAvatarSchema = z.object({
   avatar: z
      .custom<File>(file => file instanceof File, {
         message: 'Image is required',
      })
      .refine(
         file => VALID_FILE_FORMATS.values.includes(file.type),
         `Please select an image file (${VALID_FILE_FORMATS.labels})`
      )
      .refine(
         file => file.size <= MAX_SIZE.value,
         `Avatar size should be less than ${MAX_SIZE.label}`
      ),
})

export type UpdateAvatarFormValues = z.infer<typeof updateAvatarSchema>
