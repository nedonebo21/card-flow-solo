import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Error404Icon, Typography } from '@/shared/ui'

import styles from './error-404.module.scss'

export const Error404 = () => {
   const { t } = useTranslation()

   return (
      <>
         <div className={styles.image}>
            <Error404Icon width={451} height={192} />
         </div>
         <Typography className={styles.title} variant={'body1'} as={'h1'}>
            {t('page-not-found')}
         </Typography>
         <Button as={Link} to={ROUTE_PATHS.HOME}>
            {t('back-to-home')}
         </Button>
      </>
   )
}
