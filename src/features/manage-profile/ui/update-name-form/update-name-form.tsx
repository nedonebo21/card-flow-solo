import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateNameFormValues } from '../../model/update-name-schema'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'

import styles from './update-name-form.module.scss'

import { updateNameSchema } from '../../model/update-name-schema'

type Props = {
   username: string
   onSubmit?: SubmitHandler<UpdateNameFormValues>
   onCancel: () => void
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const UpdateNameForm = ({ username, onCancel, ...rest }: Props) => {
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

   const onSubmit: SubmitHandler<UpdateNameFormValues> = (data, e) => {
      rest?.onSubmit?.(data, e)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <ControlledInput
            control={control}
            name={'name'}
            label={`Nickname`}
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
               Cancel
            </Button>
            <Button className={styles.save} disabled={!isDirty} fullWidth type={'submit'}>
               Save Changes
            </Button>
         </div>
         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
