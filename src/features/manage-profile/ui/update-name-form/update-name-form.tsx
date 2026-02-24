import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateNameFormValues } from '@/features/manage-profile'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui'

import styles from './update-name-form.module.scss'

import { updateNameSchema } from '../../model/update-name-schema'

type Props = {
   username: string
   onSubmit?: SubmitHandler<UpdateNameFormValues>
   onCancel: () => void
   isLoading: boolean
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const UpdateNameForm = ({ username, onCancel, isLoading, ...rest }: Props) => {
   const {
      handleSubmit,
      control,
      formState: { errors, isDirty },
   } = useForm<UpdateNameFormValues>({
      resolver: zodResolver(updateNameSchema),
      mode: 'onChange',
      defaultValues: {
         name: username ?? '',
      },
   })

   const { t } = useTranslation()

   const onSubmit: SubmitHandler<UpdateNameFormValues> = async (data, e) => {
      rest?.onSubmit?.(data, e)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <ControlledInput
            control={control}
            name={'name'}
            label={t('nickname')}
            errorMessage={errors.name?.message}
         />
         <div className={styles.buttons}>
            <Button
               onClick={onCancel}
               variant={'secondary'}
               className={styles.cancel}
               fullWidth
               type={'button'}
            >
               {t('cancel')}
            </Button>
            <Button
               className={styles.save}
               disabled={!isDirty || isLoading}
               fullWidth
               type={'submit'}
            >
               {t('save-changes')}
            </Button>
         </div>
         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
