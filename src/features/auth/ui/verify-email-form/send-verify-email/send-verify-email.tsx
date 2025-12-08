import { toast } from 'sonner'

import { useMeQuery } from '@/entities/user/api'
import { useSendVerifyEmailMutation } from '@/features/auth/api'
import { Button } from '@/shared/ui'

export const SendVerifyEmail = () => {
   const { data } = useMeQuery()
   const userId = data?.id ?? ''

   const [sendVerifyEmail] = useSendVerifyEmailMutation()

   const handleSend = async () => {
      try {
         await sendVerifyEmail({
            userId,
            subject: 'Email Confirm',
            html: `<b>Hello, ##name##!</b><br/>Please confirm your email by code below:<br/><h2>##token##</h2>`,
         }).unwrap()
         toast.success('Confirm email has been send')
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <Button onClick={handleSend} variant={'link'}>
         Send code again
      </Button>
   )
}
