import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { FormValues } from '@/features/auth/model'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema } from '@/features/auth/model'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { InputEmail, InputPassword } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'

import styles from './login-form.module.scss'

type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<FormValues>
}

export const LoginForm = ({ onSubmit: onSubmitFormProps, ...rest }: LoginFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
         rememberMe: false,
      },
   })

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <Card className={styles.wrapper}>
            <Typography variant={'h1'} className={styles.title}>
               Sign In
            </Typography>
            <div className={styles.fields}>
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
               </div>
               <div className={styles.options}>
                  <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
                  <Typography
                     className={styles.forgotPassword}
                     variant={'body2'}
                     as={'a'}
                     href={'#'}
                  >
                     Forgot password?
                  </Typography>
               </div>
            </div>
            <Button fullWidth type={'submit'}>
               Sign In
            </Button>
            <div className={styles.footer}>
               <Typography className={styles.footerText} variant={'body2'}>
                  Don&#39;t have an account?
               </Typography>
               <Typography className={styles.footerLink} variant={'h4'} as={'a'} href={'#'}>
                  Sign Up
               </Typography>
            </div>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
