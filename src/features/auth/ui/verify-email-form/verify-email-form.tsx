import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { VerifyEmailFormValues } from '../../model/verify-email-schema'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'

import { useMeQuery } from '@/entities/user'
import { ControlledInput } from '@/shared/forms'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Card, CheckEmailIcon, Typography } from '@/shared/ui'

import styles from './verify-email-form.module.scss'

import { useVerifyEmailMutation } from '../../api/auth-api'
import { verifyEmailSchema } from '../../model/verify-email-schema'
import { SendVerifyEmail } from './send-verify-email/send-verify-email'

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
   const { t } = useTranslation()

   const userEmail = email ?? data?.email

   const [verifyEmail] = useVerifyEmailMutation()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await verifyEmail({ code: data.code }).unwrap()
            navigate(ROUTE_PATHS.PROFILE)
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
                  {t('features.auth.confirm-email')}
               </Typography>
            </div>
            <div className={styles.content}>
               <CheckEmailIcon width={96} height={96} />
               <Typography variant={'body2'} className={styles.text}>
                  {t('features.auth.we-send-instructions')} {userEmail}
               </Typography>
            </div>
            <div className={styles.field}>
               <ControlledInput
                  control={control}
                  name={'code'}
                  label={t('features.auth.enter-code')}
                  errorMessage={errors.code?.message}
               />
            </div>
            <Button type={'submit'}>{t('shared.confirm')}</Button>
            <div className={styles.footer}>
               <Typography variant={'body2'}>{t('features.auth.didnt-receive')}</Typography>
               <SendVerifyEmail />
            </div>
         </Card>
      </form>
   )
}
