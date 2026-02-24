import type { ChangeEvent } from 'react'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { InputSearch } from '@/shared/ui'

import styles from './cards-search.module.scss'

export const CardsSearch = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const question = searchParams.get('question')
   const { t } = useTranslation()

   const handleQuestionChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const newName = e.target.value

         if (newName.length < 1) {
            searchParams.delete('question')
         } else {
            searchParams.set('question', e.target.value)
         }

         setSearchParams(searchParams)
      },
      [searchParams, setSearchParams]
   )

   const handleClear = () => {
      searchParams.delete('question')
      setSearchParams(searchParams)
   }

   return (
      <InputSearch
         className={styles.input}
         placeholder={t('search')}
         value={question ?? ''}
         onChange={handleQuestionChange}
         onClear={handleClear}
      />
   )
}
