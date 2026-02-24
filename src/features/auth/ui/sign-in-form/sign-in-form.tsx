import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { SignInFormValues } from '../../model/sign-in-schema'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Card, InputEmail, InputPassword, Typography } from '@/shared/ui'

import styles from './sign-in-form.module.scss'

import { useSignInMutation } from '../../api/auth-api'
import { signInSchema } from '../../model/sign-in-schema'

type SignInFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<SignInFormValues>
}

export const SignInForm = ({ onSubmit: onSubmitFormProps, ...rest }: SignInFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<SignInFormValues>({
      resolver: zodResolver(signInSchema),
      defaultValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
   })

   const { t } = useTranslation()

   const [signIn, { isError, isLoading }] = useSignInMutation()
   const navigate = useNavigate()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await signIn(data).unwrap()
            navigate(ROUTE_PATHS.HOME)
         } catch (error) {
            navigate(ROUTE_PATHS.SIGN_IN)
            console.error(error)
         }
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <Card className={styles.wrapper}>
            <div className={styles.header}>
               <Typography variant={'h1'}>{t('sign-in')}</Typography>
            </div>
            <div className={styles.content}>
               <div className={styles.inputs}>
                  <ControlledInput
                     InputComponent={InputEmail}
                     control={control}
                     name={'email'}
                     label={t('email')}
                     placeholder={'example@example.com'}
                     errorMessage={errors.email?.message}
                     disabled={isLoading}
                  />
                  <ControlledInput
                     InputComponent={InputPassword}
                     control={control}
                     name={'password'}
                     label={t('password')}
                     errorMessage={errors.password?.message}
                     disabled={isLoading}
                  />
                  <Typography variant={'error'}>
                     {isError ? 'Invalid email or password' : ''}
                  </Typography>
               </div>
               <div className={styles.options}>
                  <ControlledCheckbox
                     control={control}
                     name={'rememberMe'}
                     label={t('remember-me')}
                     disabled={isLoading}
                  />
                  <Button
                     className={styles.forgotPassword}
                     variant={'link'}
                     as={Link}
                     to={ROUTE_PATHS.FORGOT_PASSWORD}
                  >
                     {t('forgot-password')}
                  </Button>
               </div>
            </div>
            <Button disabled={isLoading} fullWidth type={'submit'}>
               {t('login')}
            </Button>
            <div className={styles.footer}>
               <Typography className={styles.footerText} variant={'body2'}>
                  {t('dont-have-account')}
               </Typography>
               <Button variant={'link'} as={Link} to={ROUTE_PATHS.SIGN_UP}>
                  {t('sign-up')}
               </Button>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
