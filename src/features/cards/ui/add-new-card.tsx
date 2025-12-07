import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { AddNewCardFormValues } from '../model'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAddCardMutation } from '@/entities/cards/api'
import { addNewCardSchema } from '@/features/cards/model'
import { Button, Dialog } from '@/shared/ui'

import { CardFieldsSection } from './card-fileds-section'

type AddNewCardProps = {
   onSubmit?: SubmitHandler<AddNewCardFormValues>
   deckId: string
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const AddNewCard = ({ onSubmit: onSubmitFormProps, deckId, ...rest }: AddNewCardProps) => {
   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<AddNewCardFormValues>({
      resolver: zodResolver(addNewCardSchema),
      defaultValues: {
         answer: '',
         question: '',
         answerImg: '',
         questionImg: '',
      },
   })

   const [addCard] = useAddCardMutation()

   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
   }

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await addCard({ body: data, id: deckId }).unwrap()
            handleOpenChange(false)
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <form id={'add-card-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
         <Dialog
            trigger={<Button>Add New Card</Button>}
            open={isOpen}
            onOpenChange={handleOpenChange}
            showCancelButton
            confirmButtonLabel={'Add Card'}
            confirmButtonFormId={'add-card-form'}
            cancelButtonLabel={'Cancel'}
            heading={'Add Card'}
         >
            <CardFieldsSection
               control={control}
               register={register}
               inputName={'question'}
               errorMessage={errors.question?.message}
               inputLabel={'Question'}
               imageFieldName={'questionImg'}
            />

            <CardFieldsSection
               control={control}
               register={register}
               inputName={'answer'}
               errorMessage={errors.answer?.message}
               inputLabel={'Answer'}
               imageFieldName={'answerImg'}
            />
         </Dialog>
      </form>
   )
}
