import type { ComponentProps } from 'react'

import { type SubmitHandler, useController } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { InputEmail, InputPassword } from '@/shared/ui/input'

type FormValues = {
   email: string
   password: string
   rememberMe: boolean
}

type LoginFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<FormValues>
}

export const LoginForm = ({ onSubmit: onSubmitFormProps, ...rest }: LoginFormProps) => {
   const { register, handleSubmit, control } = useForm<FormValues>()

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)
   }

   const {
      field: { value: checked, onChange: onCheckedChange },
   } = useController({ control, name: 'rememberMe', defaultValue: false })

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
         <InputEmail {...register('email')} label={'Email'} />
         <InputPassword {...register('password')} label={'Password'} />
         <Checkbox onCheckedChange={onCheckedChange} checked={checked} label={'Remember me'} />
         <Button type={'submit'}>Submit</Button>
      </form>
   )
}
