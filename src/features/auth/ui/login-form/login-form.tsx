import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { FormValues } from '@/features/auth/model'

import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema } from '@/features/auth/model'
import { ControlledCheckbox } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { InputEmail, InputPassword } from '@/shared/ui/input'
type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<FormValues>
}

export const LoginForm = ({ onSubmit: onSubmitFormProps, ...rest }: LoginFormProps) => {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FormValues>({
      resolver: zodResolver(loginSchema),
   })

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <InputEmail {...register('email')} label={'Email'} errorMessage={errors.email?.message} />
         <InputPassword
            {...register('password')}
            label={'Password'}
            errorMessage={errors.password?.message}
         />
         <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
         <Button type={'submit'}>Submit</Button>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
