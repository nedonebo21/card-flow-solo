import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { SignUpFormValues } from '../../model/sign-up-schema'

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ROUTE_PATHS } from '@/shared/constants'
import { ControlledInput } from '@/shared/forms'
import { Button, Card, InputEmail, InputPassword, Typography } from '@/shared/ui'

import styles from './sign-up-form.module.scss'

import { useSignUpMutation } from '../../api/auth-api'
import { signUpSchema } from '../../model/sign-up-schema'

type SignUpFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<SignUpFormValues>
}

export const SignUpForm = ({ onSubmit: onSubmitFormProps, ...rest }: SignUpFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<SignUpFormValues>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         email: '',
         password: '',
         confirm: '',
      },
   })

   const [signUp, { isLoading }] = useSignUpMutation()
   const navigate = useNavigate()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps?.(data, e)
      } else {
         try {
            await signUp({ email: data.email, password: data.password }).unwrap()
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
               <Typography variant={'h1'}>Sign Up</Typography>
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
               <ControlledInput
                  InputComponent={InputPassword}
                  control={control}
                  name={'password'}
                  label={'Password'}
                  errorMessage={errors.password?.message}
               />
               <ControlledInput
                  InputComponent={InputPassword}
                  control={control}
                  name={'confirm'}
                  label={'Confirm Password'}
                  errorMessage={errors.confirm?.message}
               />
            </div>
            <div className={styles.footer}>
               <Button disabled={isLoading} fullWidth type={'submit'}>
                  Sign Up
               </Button>
               <Typography className={styles.footerText} variant={'body2'}>
                  Already have an account?
               </Typography>
               <Button variant={'link'} as={Link} to={ROUTE_PATHS.SIGN_IN}>
                  Sign In
               </Button>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
