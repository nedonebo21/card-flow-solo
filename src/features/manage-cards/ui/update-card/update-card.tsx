import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { CardFormValues } from '../../model/card-form-schema'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { useGetCardByIdQuery, useUpdateCardMutation } from '@/entities/card'
import { Button, Dialog, PencilIcon } from '@/shared/ui'

import { cardFormSchema } from '../../model/card-form-schema'
import { CardFieldsSection } from '../card-fileds-section/card-fields-section'

type UpdateCardProps = {
   onSubmit?: SubmitHandler<CardFormValues>
   id: string
   label?: string
} & Omit<ComponentProps<'form'>, 'onSubmit' | 'id'>
export const UpdateCard = ({
   onSubmit: onSubmitFormProps,
   id,
   label,
   className,
   ...rest
}: UpdateCardProps) => {
   const [isOpen, setIsOpen] = useState(false)

   const { data: card } = useGetCardByIdQuery({ id }, { skip: !isOpen })

   const {
      handleSubmit,
      register,
      control,
      formState: { errors },
   } = useForm<CardFormValues>({
      resolver: zodResolver(cardFormSchema),
      defaultValues: {
         answer: card?.answer ?? '',
         question: card?.question ?? '',
         answerImg: card?.answerImg ?? '',
         questionImg: card?.questionImg ?? '',
      },
   })

   const [updateCard, { isLoading }] = useUpdateCardMutation()

   const onSubmit: SubmitHandler<CardFormValues> = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await updateCard({ id, body: data }).unwrap()
            setIsOpen(false)
            toast.success('Card has been updated')
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
   }

   return (
      <form id={'update-card-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
         <Dialog
            trigger={
               <Button size={'icon'} variant={'ghost'}>
                  <PencilIcon />
               </Button>
            }
            open={isOpen}
            onOpenChange={handleOpenChange}
            showCancelButton
            isConfirmDisabled={isLoading}
            confirmButtonLabel={'Confirm'}
            confirmButtonFormId={'update-card-form'}
            cancelButtonLabel={'Cancel'}
            heading={'Update Card'}
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
