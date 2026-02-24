import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Card, Typography, CheckEmailIcon } from '@/shared/ui'

import styles from './check-email.module.scss'

type CheckEmailProps = {
   email?: string
}

export const CheckEmail = ({ email }: CheckEmailProps) => {
   const { t } = useTranslation()

   return (
      <Card className={styles.wrapper}>
         <div className={styles.header}>
            <Typography variant={'h1'} className={styles.title}>
               {t('check-email')}
            </Typography>
         </div>
         <div className={styles.content}>
            <CheckEmailIcon width={96} height={96} />
            <Typography variant={'body2'} className={styles.text}>
               {t('we-send-instructions')} {email}
            </Typography>
         </div>
         <Button as={Link} to={ROUTE_PATHS.SIGN_IN}>
            {t('back-to-sign-in')}
         </Button>
      </Card>
   )
}
