import { z } from 'zod'

export const avatarSchema = z.object({
   avatar: z
      .instanceof(FileList)
      .refine(
         files => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files[0].type),
         'Please select an image file (JPEG, PNG, WebP)'
      )
      .refine(files => files[0].size <= 10 * 1024 * 1024, 'Avatar size should be less than 10 MB'),
})

export type AvatarFormValues = z.infer<typeof avatarSchema>
