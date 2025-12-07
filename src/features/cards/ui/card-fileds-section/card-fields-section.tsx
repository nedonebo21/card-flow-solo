import type { ChangeEvent } from 'react'
import type { Control, UseFormRegister } from 'react-hook-form'

import type { AddNewCardFormValues } from '@/features/cards/model'

import { useRef, useState } from 'react'

import { VALID_FILE_FORMATS } from '@/features/decks/model'
import { ControlledInput } from '@/shared/forms'
import { Button, CropImageDialog, ImageIcon } from '@/shared/ui'

type CardFieldsSectionProps = {
   control: Control<AddNewCardFormValues>
   register: UseFormRegister<AddNewCardFormValues>
   errorMessage?: string
   inputName: 'question' | 'answer'
   imageFieldName: 'questionImg' | 'answerImg'
   inputLabel: string
}

export const CardFieldsSection = ({
   control,
   register,
   errorMessage,
   inputName,
   imageFieldName,
   inputLabel,
}: CardFieldsSectionProps) => {
   const [imagePreview, setImagePreview] = useState<string | null>(null)
   const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null)
   const [isCropperOpen, setIsCropperOpen] = useState(false)

   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleImageChangeClick = () => {
      fileInputRef.current?.click()
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
         return
      }

      const url = URL.createObjectURL(file)

      setOriginalImageUrl(url)
      setIsCropperOpen(true)
   }

   const handleCropComplete = (croppedImageUrl: string) => {
      setImagePreview(croppedImageUrl)
      setIsCropperOpen(false)

      if (originalImageUrl) {
         URL.revokeObjectURL(originalImageUrl)
         setOriginalImageUrl(null)
      }
   }

   const handleCropDialogOpenChange = (open: boolean) => {
      setIsCropperOpen(open)
      if (!open && originalImageUrl) {
         URL.revokeObjectURL(originalImageUrl)
         setOriginalImageUrl(null)
      }
   }

   return (
      <>
         <ControlledInput
            control={control}
            name={inputName}
            label={inputLabel}
            errorMessage={errorMessage}
         />
         <Button fullWidth onClick={handleImageChangeClick} type={'button'} variant={'secondary'}>
            <ImageIcon width={16} height={16} />
            {imagePreview ? 'Change Image' : 'Upload Image'}
         </Button>
         {imagePreview && (
            <img className={'cover'} src={imagePreview} alt={`${inputLabel} Preview`} />
         )}
         <input
            {...register(imageFieldName)}
            type={'file'}
            accept={VALID_FILE_FORMATS.values.join(',')}
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
         />
         {originalImageUrl && (
            <CropImageDialog
               open={isCropperOpen}
               onOpenChange={handleCropDialogOpenChange}
               image={originalImageUrl}
               onCropComplete={handleCropComplete}
               aspect={2}
            />
         )}
      </>
   )
}
