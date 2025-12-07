import type { SubmitHandler } from 'react-hook-form'

import type { ForgotPasswordFormValues } from '@/features/auth/model'

import { type ComponentProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRecoverPasswordMutation } from '@/features/auth/api'
import { forgotPasswordSchema } from '@/features/auth/model'
import { CheckEmail } from '@/features/auth/ui'
import { ControlledInput } from '@/shared/forms'
import { Button, Card, InputEmail, Typography } from '@/shared/ui'

import styles from './forgot-password-form.module.scss'

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

   const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
   const [submittedEmail, setSubmittedEmail] = useState('')

   const [recoverPassword] = useRecoverPasswordMutation()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         onSubmitFormProps(data, e)
      } else {
         try {
            await recoverPassword({
               email: data.email,
               subject: 'Password Recover',
               html: `<h1>Hi, ##name##</h1><p>Click <a href="http://localhost:5173/create-new-password/##token##">here</a> to recover your password</p>`,
            }).unwrap()
            setIsEmailSubmitted(true)
            setSubmittedEmail(data.email)
         } catch (error) {
            console.error(error)
         }
      }
   }

   return isEmailSubmitted ? (
      <CheckEmail email={submittedEmail} />
   ) : (
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
               <Typography
                  className={styles.footerLink}
                  variant={'body1'}
                  as={Link}
                  to={'/sign-in'}
               >
                  Try logging in
               </Typography>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
