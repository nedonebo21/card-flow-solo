import type { SubmitHandler } from 'react-hook-form'

import type { CreateDeckFormValues } from '../../model'

import { type ChangeEvent, type ComponentProps, useEffect, useState } from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateDeckMutation } from '@/entities/decks/api'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button, Dialog, ImageIcon } from '@/shared/ui'

import styles from './create-deck.module.scss'

import { createDeckSchema, VALID_FILE_FORMATS } from '../../model'

type CreateDeckFormProps = {
   onSubmit?: SubmitHandler<CreateDeckFormValues>
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const CreateDeck = ({ onSubmit: onSubmitFormProps, ...rest }: CreateDeckFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
      register,
      setValue,
      watch,
      reset,
   } = useForm<CreateDeckFormValues>({
      resolver: zodResolver(createDeckSchema),
      defaultValues: {
         name: '',
         isPrivate: false,
      },
   })

   const [createDeck] = useCreateDeckMutation()
   const navigate = useNavigate()

   const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
   const [isOpen, setIsOpen] = useState(false)

   const fileInputRef = useRef<HTMLInputElement>(null)

   const coverFile = watch('cover')

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

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('isPrivate', String(data.isPrivate))

      if (data.cover instanceof File) {
         formData.append('cover', data.cover)
      }

      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await createDeck(formData)
            navigate('/')
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      if (!open) {
         reset({
            name: '',
            isPrivate: false,
            cover: undefined,
         })
      }
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
         return
      }
      setValue('cover', file)
   }

   const isCoverSelect = !!coverPreviewUrl

   return (
      <form id={'create-deck-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
         <Dialog
            open={isOpen}
            onOpenChange={handleOpenChange}
            trigger={<Button>New Deck</Button>}
            heading={'Add New Deck'}
            confirmButtonLabel={'Add New Pack'}
            showCancelButton
            cancelButtonLabel={'Cancel'}
            confirmButtonFormId={'create-deck-form'}
         >
            {isCoverSelect && (
               <img className={styles.cover} src={coverPreviewUrl} alt={'Cover Preview'} />
            )}
            <ControlledInput
               control={control}
               name={'name'}
               label={'Name Pack'}
               errorMessage={errors.name?.message}
            />
            <Button
               fullWidth
               onClick={handleChangeCoverClick}
               type={'button'}
               variant={'secondary'}
            >
               <ImageIcon width={16} height={16} />
               {isCoverSelect ? 'Change Image' : 'Upload Image'}
            </Button>
            <input
               {...register('cover')}
               type={'file'}
               accept={VALID_FILE_FORMATS.values.join(',')}
               ref={fileInputRef}
               onChange={handleFileChange}
               style={{ display: 'none' }}
            />
            <ControlledCheckbox control={control} name={'isPrivate'} label={'Private Pack'} />
         </Dialog>
      </form>
   )
}
