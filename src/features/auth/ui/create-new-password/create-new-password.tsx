import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { NewPasswordFormValues } from '../../model/new-password-schema'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledInput } from '@/shared/forms'
import { Button, Card, InputPassword, Typography } from '@/shared/ui'

import styles from './create-new-password.module.scss'

import { newPasswordSchema } from '../../model/new-password-schema'

type NewPasswordFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<NewPasswordFormValues>
}

export const CreateNewPassword = ({
   onSubmit: onSubmitFormProps,
   ...rest
}: NewPasswordFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<NewPasswordFormValues>({
      resolver: zodResolver(newPasswordSchema),
      defaultValues: {
         password: '',
      },
   })

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <Card className={styles.wrapper}>
            <div className={styles.header}>
               <Typography variant={'h1'}>Create new password</Typography>
            </div>
            <div className={styles.content}>
               <ControlledInput
                  InputComponent={InputPassword}
                  control={control}
                  name={'password'}
                  label={'Password'}
                  errorMessage={errors.password?.message}
               />
               <Typography textAlign={'left'} className={styles.text} variant={'body2'}>
                  Create new password and we will send you further instructions to email
               </Typography>
            </div>
            <Button fullWidth type={'submit'}>
               Create New Password
            </Button>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
