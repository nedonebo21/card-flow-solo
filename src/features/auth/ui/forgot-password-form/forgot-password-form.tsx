import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { ForgotPasswordFormValues } from '../../model/forgot-password-schema'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledInput } from '@/shared/forms'
import { Button, Card, InputEmail, Typography } from '@/shared/ui'

import styles from './forgot-password-form.module.scss'

import { forgotPasswordSchema } from '../../model/forgot-password-schema'

type ForgotPasswordFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<ForgotPasswordFormValues>
}

export const ForgotPasswordForm = ({
   onSubmit: onSubmitFormProps,
   ...rest
}: ForgotPasswordFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
         email: '',
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
                  Forgot your password?
               </Typography>
            </div>
            <div className={styles.content}>
               <ControlledInput
                  InputComponent={InputEmail}
                  control={control}
                  placeholder={'example@example.com'}
                  name={'email'}
                  label={'Email'}
                  errorMessage={errors.email?.message}
               />
               <Typography textAlign={'left'} className={styles.text} variant={'body2'}>
                  Enter your email address and we will send you further instructions
               </Typography>
            </div>
            <div className={styles.footer}>
               <Button fullWidth type={'submit'}>
                  Send Instructions
               </Button>
               <Typography className={styles.footerText} variant={'body2'}>
                  Did you remember your password?
               </Typography>
               <Typography className={styles.footerLink} variant={'body1'} as={'a'} href={'#'}>
                  Try logging in
               </Typography>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
