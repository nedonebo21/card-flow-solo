import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { SignUpValues } from '@/features/auth/model'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema } from '@/features/auth/model'
import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { InputEmail, InputPassword } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'

import styles from './sign-up-form.module.scss'

type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<SignUpValues>
}

export const SignUpForm = ({ onSubmit: onSubmitFormProps, ...rest }: LoginFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<SignUpValues>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         email: '',
         password: '',
         confirmedPassword: '',
      },
   })

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)
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
                  name={'confirmedPassword'}
                  label={'Confirm Password'}
                  errorMessage={errors.confirmedPassword?.message}
               />
            </div>
            <div className={styles.footer}>
               <Button fullWidth type={'submit'}>
                  Sign Up
               </Button>
               <Typography className={styles.footerText} variant={'body2'}>
                  Already have an account?
               </Typography>
               <Typography className={styles.footerLink} variant={'h4'} as={'a'} href={'#'}>
                  Sign In
               </Typography>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
