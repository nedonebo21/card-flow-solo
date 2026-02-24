import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import { useMeQuery } from '@/entities/user'
import { Button } from '@/shared/ui'

import { useSendVerifyEmailMutation } from '../../../api/auth-api'

export const SendVerifyEmail = () => {
   const { data } = useMeQuery()
   const userId = data?.id ?? ''

   const [sendVerifyEmail] = useSendVerifyEmailMutation()

   const { t } = useTranslation()

   const handleSend = async () => {
      try {
         await sendVerifyEmail({
            userId,
            subject: 'Email Confirm',
            html: `<b>Hello, ##name##!</b><br/>Please confirm your email by code below:<br/><h2>##token##</h2>`,
         }).unwrap()
         toast.success(t('confirm-has-been-sent'))
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <Button onClick={handleSend} variant={'link'}>
         {t('send-code-again')}
      </Button>
   )
}
