import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { CardFormValues } from '../../model/card-form-schema'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { useCreateCardMutation } from '@/entities/card'
import { Button, Dialog } from '@/shared/ui'

import { cardFormSchema } from '../../model/card-form-schema'
import { CardFieldsSection } from '../card-fileds-section/card-fields-section'

type AddNewCardProps = {
   onSubmit?: SubmitHandler<CardFormValues>
   deckId: string
   refetch: () => void
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const CreateCard = ({
   onSubmit: onSubmitFormProps,
   deckId,
   refetch,
   ...rest
}: AddNewCardProps) => {
   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<CardFormValues>({
      resolver: zodResolver(cardFormSchema),
      defaultValues: {
         answer: '',
         question: '',
         answerImg: '',
         questionImg: '',
      },
   })

   const [addCard, { isLoading }] = useCreateCardMutation()

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
            refetch()
            toast.success(`Card "${data.question}" has been created`)
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
            isConfirmDisabled={isLoading}
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
