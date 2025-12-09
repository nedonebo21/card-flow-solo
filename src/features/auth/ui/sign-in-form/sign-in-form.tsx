import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { SignInFormValues } from '../../model/sign-in-schema'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ROUTE_PATHS } from '@/shared/constants'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
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
            console.error(error)
         }
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <Card className={styles.wrapper}>
            <div className={styles.header}>
               <Typography variant={'h1'}>Sign In</Typography>
            </div>
            <div className={styles.content}>
               <div className={styles.inputs}>
                  <ControlledInput
                     InputComponent={InputEmail}
                     control={control}
                     name={'email'}
                     label={'Email'}
                     placeholder={'example@example.com'}
                     errorMessage={errors.email?.message}
                  />
                  <ControlledInput
                     InputComponent={InputPassword}
                     control={control}
                     name={'password'}
                     label={'Password'}
                     errorMessage={errors.password?.message}
                  />
                  <Typography variant={'error'}>
                     {isError ? 'Invalid email or password' : ''}
                  </Typography>
               </div>
               <div className={styles.options}>
                  <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
                  <Button
                     className={styles.forgotPassword}
                     variant={'link'}
                     as={Link}
                     to={ROUTE_PATHS.FORGOT_PASSWORD}
                  >
                     Forgot password?
                  </Button>
               </div>
            </div>
            <Button disabled={isLoading} fullWidth type={'submit'}>
               Sign In
            </Button>
            <div className={styles.footer}>
               <Typography className={styles.footerText} variant={'body2'}>
                  Don&#39;t have an account?
               </Typography>
               <Button variant={'link'} as={Link} to={ROUTE_PATHS.SIGN_UP}>
                  Sign Up
               </Button>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
