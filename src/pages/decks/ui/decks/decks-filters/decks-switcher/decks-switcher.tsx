import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { clearFilters } from '@/shared/lib'
import { HeartOutlineIcon, Tabs, Typography } from '@/shared/ui'

import styles from './decks-switcher.module.scss'

export const DecksSwitcher = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const show = searchParams.get('show') || 'all'

   const setShow = useCallback(
      (show: string) => {
         const nextParams = new URLSearchParams(searchParams)

         if (show === 'all') {
            searchParams.delete('show')
            clearFilters(nextParams)
         } else {
            searchParams.set('show', show)
            clearFilters(nextParams)
         }

         setSearchParams(nextParams)
      },
      [searchParams, setSearchParams]
   )

   return (
      <Tabs onValueChange={setShow} value={show ?? undefined}>
         <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
            Show decks cards
         </Typography>
         <Tabs.List className={styles.tabs}>
            <Tabs.Trigger className={styles.favorite} value={'favorite'}>
               <HeartOutlineIcon />
            </Tabs.Trigger>
            <Tabs.Trigger value={'my'}>My Cards</Tabs.Trigger>
            <Tabs.Trigger value={'all'}>All Cards</Tabs.Trigger>
         </Tabs.List>
      </Tabs>
   )
}
