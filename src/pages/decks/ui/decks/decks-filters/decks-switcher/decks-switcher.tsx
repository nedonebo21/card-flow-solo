import { useSearchParams } from 'react-router-dom'

import { Tabs, Typography } from '@/shared/ui'

import styles from './decks-switcher.module.scss'

export const DecksSwitcher = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const show = searchParams.get('show') || 'all'

   const setShow = (show: string) => {
      searchParams.set('show', show)
      setSearchParams(searchParams)
   }

   return (
      <Tabs onValueChange={setShow} value={show ?? undefined}>
         <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
            Show decks cards
         </Typography>
         <Tabs.List className={styles.tabs}>
            <Tabs.Trigger value={'my'}>My Cards</Tabs.Trigger>
            <Tabs.Trigger value={'all'}>All Cards</Tabs.Trigger>
         </Tabs.List>
      </Tabs>
   )
}
