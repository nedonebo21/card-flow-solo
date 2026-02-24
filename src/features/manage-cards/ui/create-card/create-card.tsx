import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { CardFormValues } from '../../model/card-form-schema'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
      control,
      setValue,
      formState: { errors },
   } = useForm<CardFormValues>({
      resolver: zodResolver(cardFormSchema),
   })

   const [addCard, { isLoading }] = useCreateCardMutation()

   const { t } = useTranslation()

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
            toast.success(`${t('card')} "${data.question}" ${t('created-successfully')}`)
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <form id={'add-card-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
         <Dialog
            trigger={<Button>{t('add-card')}</Button>}
            open={isOpen}
            onOpenChange={handleOpenChange}
            showCancelButton
            isConfirmDisabled={isLoading}
            confirmButtonLabel={t('add-card')}
            confirmButtonFormId={'add-card-form'}
            cancelButtonLabel={t('cancel')}
            heading={t('add-card')}
         >
            <CardFieldsSection
               control={control}
               setValue={setValue}
               inputName={'question'}
               errorMessage={errors.question?.message}
               inputLabel={t('question')}
               imageFieldName={'questionImg'}
            />

            <CardFieldsSection
               control={control}
               setValue={setValue}
               inputName={'answer'}
               errorMessage={errors.answer?.message}
               inputLabel={t('answer')}
               imageFieldName={'answerImg'}
            />
         </Dialog>
      </form>
   )
}
