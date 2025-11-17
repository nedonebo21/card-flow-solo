import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { FormValues } from '../../model/login-schema'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { InputEmail, InputPassword } from '@/shared/ui/input'

import { loginSchema } from '../../model/login-schema'

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
         <ControlledInput
            InputComponent={InputEmail}
            control={control}
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
         <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
         <Button type={'submit'}>Submit</Button>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
