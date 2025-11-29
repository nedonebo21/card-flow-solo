import type { ChangeEvent } from 'react'

import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { InputSearch } from '@/shared/ui'

import styles from './decks-search.module.scss'

export const DecksSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const name = searchParams.get('name')

   const handleNameChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const newName = e.target.value

         if (newName.length < 1) {
            searchParams.delete('name')
         } else {
            searchParams.set('name', e.target.value)
         }
         setSearchParams(searchParams)
      },
      [searchParams, setSearchParams]
   )

   const handleClear = () => {
      searchParams.delete('name')
      setSearchParams(searchParams)
   }

   return (
      <InputSearch
         className={styles.input}
         placeholder={'...'}
         value={name ?? ''}
         onChange={handleNameChange}
         onClear={handleClear}
      />
   )
}
