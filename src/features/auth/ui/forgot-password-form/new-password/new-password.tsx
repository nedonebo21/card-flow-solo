import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { NewPasswordValues } from '@/features/auth/model'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { newPasswordSchema } from '@/features/auth/model'
import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { InputPassword } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'

import styles from './new-password.module.scss'

type NewPasswordFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<NewPasswordValues>
}

export const NewPasswordForm = ({ onSubmit: onSubmitFormProps, ...rest }: NewPasswordFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<NewPasswordValues>({
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
               <Typography variant={'h1'} className={styles.title}>
                  Create new password
               </Typography>
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
