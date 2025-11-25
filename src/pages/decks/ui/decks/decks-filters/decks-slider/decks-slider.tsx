import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Slider, Typography } from '@/shared/ui'

import styles from './decks-slider.module.scss'

export const DecksSlider = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const min = Number(searchParams.get('min')) || 0
   const max = Number(searchParams.get('max')) || 100

   const setRange = useCallback(
      (range: number[]) => {
         const [newMin, newMax] = range

         if (newMin !== 0) {
            searchParams.set('min', newMin.toString())
         } else {
            searchParams.delete('min')
         }

         if (newMax !== 100) {
            searchParams.set('max', newMax.toString())
         } else {
            searchParams.delete('max')
         }

         setSearchParams(searchParams)
      },
      [searchParams, setSearchParams]
   )

   const minCards = 0
   const maxCards = 100

   return (
      <div>
         <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
            Number of cards
         </Typography>
         <Slider values={[min, max]} min={minCards} max={maxCards} onValueCommit={setRange} />
      </div>
   )
}
