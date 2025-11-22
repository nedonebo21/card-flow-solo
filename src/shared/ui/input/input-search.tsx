import type { InputProps } from './input'

import { memo, useMemo } from 'react'

import { CloseIcon, SearchIcon } from '@/shared/ui'

import styles from './input.module.scss'

import { Input } from './input'

type InputSearchProps = {
   onClear?: () => void
} & Omit<InputProps, 'type' | 'startIcon' | 'endIcon'>

export const InputSearch = memo(({ onClear, className, disabled, ...rest }: InputSearchProps) => {
   const showClearButton = !!onClear && !!rest?.value

   const clearButton = useMemo(() => {
      if (!showClearButton) {
         return null
      }

      return (
         <button
            className={styles.iconWrapper}
            disabled={disabled}
            onClick={onClear}
            type={'button'}
         >
            <CloseIcon width={20} height={20} color={'currentColor'} />
         </button>
      )
   }, [disabled, showClearButton, onClear])

   return (
      <Input
         className={className}
         disabled={disabled}
         {...rest}
         type={'search'}
         startIcon={<SearchIcon width={20} height={20} color={'currentColor'} />}
         endIcon={clearButton}
      />
   )
})
