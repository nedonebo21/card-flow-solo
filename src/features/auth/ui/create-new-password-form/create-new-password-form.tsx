import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { NewPasswordFormValues } from '../../model/new-password-schema'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { useResetPasswordMutation } from '@/features/auth/api/auth-api'
import { ROUTE_PATHS } from '@/shared/constants'
import { ControlledInput } from '@/shared/forms'
import { Button, Card, InputPassword, Typography } from '@/shared/ui'

import styles from './create-new-password-form.module.scss'

import { newPasswordSchema } from '../../model/new-password-schema'

type NewPasswordFormProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<NewPasswordFormValues>
}

export const CreateNewPasswordForm = ({
   onSubmit: onSubmitFormProps,
   ...rest
}: NewPasswordFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<NewPasswordFormValues>({
      resolver: zodResolver(newPasswordSchema),
      defaultValues: {
         password: '',
      },
   })

   const { token } = useParams<{ token: string }>()

   const navigate = useNavigate()

   const [resetPassword] = useResetPasswordMutation()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         onSubmitFormProps(data, e)
      } else {
         try {
            await resetPassword({ password: data.password, token: token || '' })
            toast.success('Password has successfully reset')
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
               <Typography variant={'h1'}>Create new password</Typography>
            </div>
            <div className={styles.content}>
               <ControlledInput
                  InputComponent={InputPassword}
                  control={control}
                  name={'password'}
                  label={'Password'}
                  errorMessage={errors.password?.message}
               />
               <Typography textAlign={'left'} className={styles.text} variant={'body2'}>
                  Create new password and we will send you further instructions to email
               </Typography>
            </div>
            <Button fullWidth type={'submit'}>
               Create New Password
            </Button>
         </Card>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
