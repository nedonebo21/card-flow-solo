import type { ChangeEvent } from 'react'

import { useSearchParams } from 'react-router-dom'

import { InputSearch } from '@/shared/ui'

import styles from './decks-search.module.scss'

export const DecksSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const name = searchParams.get('name')
   const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      searchParams.set('name', e.target.value)
      setSearchParams(searchParams)
   }
   const handleClear = () => {
      searchParams.set('name', '')
      setSearchParams(searchParams)
   }

   return (
      <InputSearch
         className={styles.input}
         placeholder={'...'}
         value={name ?? undefined}
         onChange={handleNameChange}
         onClear={handleClear}
      />
   )
}
