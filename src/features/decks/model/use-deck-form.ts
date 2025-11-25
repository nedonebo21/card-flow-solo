import type { ChangeEvent } from 'react'

import type { DeckFormValues } from '@/features/decks/model'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { deckFormSchema } from '@/features/decks/model'

interface UseDeckFormProps {
   defaultName?: string
   defaultIsPrivate?: boolean
}

export const useDeckForm = ({
   defaultName = '',
   defaultIsPrivate = false,
}: UseDeckFormProps = {}) => {
   const form = useForm<DeckFormValues>({
      resolver: zodResolver(deckFormSchema),
      defaultValues: {
         name: defaultName,
         isPrivate: defaultIsPrivate,
      },
   })

   const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
   const [isCropperOpen, setIsCropperOpen] = useState(false)
   const [originalCoverUrl, setOriginalCoverUrl] = useState<string | null>(null)

   const fileInputRef = useRef<HTMLInputElement>(null)

   const coverFile = form.watch('cover')

   useEffect(() => {
      if (coverFile instanceof File) {
         const url = URL.createObjectURL(coverFile)

         setCoverPreviewUrl(url)

         return () => {
            URL.revokeObjectURL(url)
         }
      } else {
         setCoverPreviewUrl(null)
      }
   }, [coverFile])

   const handleChangeCoverClick = () => {
      fileInputRef.current?.click()
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
         return
      }

      const url = URL.createObjectURL(file)

      setOriginalCoverUrl(url)
      setIsCropperOpen(true)
   }

   const handleCropComplete = async (croppedImageUrl: string) => {
      const response = await fetch(croppedImageUrl)
      const blob = await response.blob()
      const file = new File([blob], 'cover.jpg', { type: 'image/jpeg' })

      form.setValue('cover', file)
      setCoverPreviewUrl(croppedImageUrl)

      if (originalCoverUrl) {
         URL.revokeObjectURL(originalCoverUrl)
         setOriginalCoverUrl(null)
      }
   }

   const handleCropDialogOpenChange = (open: boolean) => {
      setIsCropperOpen(open)
      if (!open && originalCoverUrl) {
         URL.revokeObjectURL(originalCoverUrl)
         setOriginalCoverUrl(null)
      }
   }

   const isCoverSelect = !!coverPreviewUrl

   return {
      form,
      coverPreviewUrl,
      isCropperOpen,
      originalCoverUrl,
      fileInputRef,
      isCoverSelect,
      handleChangeCoverClick,
      handleFileChange,
      handleCropComplete,
      handleCropDialogOpenChange,
   }
}
