import { useTranslation } from 'react-i18next'

import { Dropdown, Typography } from '@/shared/ui'

import styles from './switch-language-button.module.scss'

export const SwitchLanguageButton = () => {
   const { i18n } = useTranslation()
   const currentLanguage = i18n.language?.startsWith('ru') ? 'RU' : 'EN'

   const switchToRu = () => {
      i18n.changeLanguage('ru')
   }

   const switchToEn = () => {
      i18n.changeLanguage('en')
   }

   return (
      <Dropdown triggerButton={<Typography variant={'body2'}>{currentLanguage}</Typography>}>
         <Dropdown.Item onClick={switchToRu}>
            <Typography variant={'body2'} className={styles.choise}>
               РУС
            </Typography>
         </Dropdown.Item>
         <Dropdown.Item onClick={switchToEn}>
            <Typography variant={'body2'} className={styles.choise}>
               ENG
            </Typography>
         </Dropdown.Item>
      </Dropdown>
   )
}
