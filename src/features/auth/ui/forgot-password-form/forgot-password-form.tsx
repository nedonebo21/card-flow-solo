import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { ForgotPasswordFormValues } from '../../model/forgot-password-schema'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledInput } from '@/shared/forms'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Card, InputEmail, Typography } from '@/shared/ui'

import styles from './forgot-password-form.module.scss'

import { useRecoverPasswordMutation } from '../../api/auth-api'
import { forgotPasswordSchema } from '../../model/forgot-password-schema'
import { CheckEmail } from './check-email/check-email'

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

   const { t } = useTranslation()

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
               html: `<h1>Hi, ##name##</h1><p>Click <a href="${import.meta.env.VITE_APP_URL}create-new-password/##token##">here</a> to recover your password</p>`,
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
                  {t('forgot-password')}
               </Typography>
            </div>
            <div className={styles.content}>
               <ControlledInput
                  InputComponent={InputEmail}
                  control={control}
                  placeholder={'example@example.com'}
                  name={'email'}
                  label={t('email')}
                  errorMessage={errors.email?.message}
               />
               <Typography textAlign={'left'} className={styles.text} variant={'body2'}>
                  {t('enter-email-for-instructions')}
               </Typography>
            </div>
            <div className={styles.footer}>
               <Button fullWidth type={'submit'}>
                  {t('send-instructions')}
               </Button>
               <Typography className={styles.footerText} variant={'body2'}>
                  {t('did-remember-password')}
               </Typography>
               <Typography
                  className={styles.footerLink}
                  variant={'body1'}
                  as={Link}
                  to={ROUTE_PATHS.SIGN_IN}
               >
                  {t('try-logging-in')}
               </Typography>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
