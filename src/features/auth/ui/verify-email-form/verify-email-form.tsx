import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { VerifyEmailFormValues } from '@/features/auth/model'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { useMeQuery } from '@/entities/user/api'
import { useVerifyEmailMutation } from '@/features/auth/api'
import { verifyEmailSchema } from '@/features/auth/model'
import { ControlledInput } from '@/shared/forms'
import { Button, Card, CheckEmailIcon, Typography } from '@/shared/ui'

import styles from './verify-email-form.module.scss'

import { SendVerifyEmail } from './send-verify-email'

type VerifyEmailFormProps = {
   onSubmit?: SubmitHandler<VerifyEmailFormValues>
   email?: string
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const VerifyEmailForm = ({
   onSubmit: onSubmitFormProps,
   email,
   ...rest
}: VerifyEmailFormProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<VerifyEmailFormValues>({
      resolver: zodResolver(verifyEmailSchema),
      defaultValues: {
         code: '',
      },
   })

   const { data } = useMeQuery()
   const navigate = useNavigate()

   const userEmail = email ?? data?.email

   const [verifyEmail] = useVerifyEmailMutation()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await verifyEmail({ code: data.code }).unwrap()
            navigate('/profile')
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
         <Card className={styles.wrapper} as={'section'}>
            <div className={styles.header}>
               <Typography variant={'h1'} className={styles.title}>
                  Confirm your email
               </Typography>
            </div>
            <div className={styles.content}>
               <CheckEmailIcon width={96} height={96} />
               <Typography variant={'body2'} className={styles.text}>
                  We’ve sent an Email with instructions to {userEmail}
               </Typography>
            </div>
            <div className={styles.field}>
               <ControlledInput
                  control={control}
                  name={'code'}
                  label={'Enter your code'}
                  errorMessage={errors.code?.message}
               />
            </div>
            <Button type={'submit'}>Confirm</Button>
            <div className={styles.footer}>
               <Typography variant={'body2'}>Didn&#39;t receive the letter?</Typography>
               <SendVerifyEmail />
            </div>
         </Card>
      </form>
   )
}
