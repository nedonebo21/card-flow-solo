import { Button, Card, Typography } from '@/shared/ui'
import { CheckEmailIcon } from '@/shared/ui/icons'

import styles from './check-email.module.scss'

type CheckEmailProps = {
   email?: string
}

export const CheckEmail = ({ email }: CheckEmailProps) => {
   return (
      <Card className={styles.wrapper}>
         <div className={styles.header}>
            <Typography variant={'h1'} className={styles.title}>
               Check Email
            </Typography>
         </div>
         <div className={styles.content}>
            <CheckEmailIcon width={96} height={96} />
            <Typography variant={'body2'} className={styles.text}>
               We’ve sent an Email with instructions to {email}
            </Typography>
         </div>
         <Button>Back to Sign In</Button>
      </Card>
   )
}
