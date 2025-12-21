import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetCardsCountQuery } from '@/entities/deck/api/decks-api'
import { Slider, Typography } from '@/shared/ui'

import styles from './decks-slider.module.scss'

export const DecksSlider = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const { data } = useGetCardsCountQuery()

   const minCards = data?.min
   const maxCards = data?.max

   const minCount = Number(searchParams.get('min')) || minCards || 0
   const maxCount = Number(searchParams.get('max')) || maxCards || 100

   const setRange = useCallback(
      (range: number[]) => {
         const [newMin, newMax] = range

         if (newMin !== minCards) {
            searchParams.set('min', newMin.toString())
            searchParams.delete('page')
         } else {
            searchParams.delete('min')
         }

         if (newMax !== maxCards) {
            searchParams.set('max', newMax.toString())
            searchParams.delete('page')
         } else {
            searchParams.delete('max')
         }

         setSearchParams(searchParams)
      },
      [searchParams, setSearchParams, minCards, maxCards]
   )

   return (
      <div>
         <Typography className={styles.label} textAlign={'left'} variant={'body2'}>
            Number of cards
         </Typography>
         <Slider
            values={[minCount, maxCount]}
            min={minCards}
            max={maxCards}
            onValueCommit={setRange}
         />
      </div>
   )
}
