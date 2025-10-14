import { type KeyboardEvent, type ChangeEvent, type ComponentProps, useCallback, memo } from 'react'

import { CloseIcon, SearchIcon } from '@/shared/ui/icons'
import { Input } from '@/shared/ui/input/input'

import styles from './input.module.scss'

interface InputSearchProps extends Omit<ComponentProps<typeof Input>, 'type' | 'startIcon'> {
   onSearch?: (value: string) => void
   onClear?: () => void
}

export const InputSearch = memo(
   ({
      value,
      onChange,
      onClear,
      endIcon,
      onSearch,
      onKeyDown,
      className,
      ...rest
   }: InputSearchProps) => {
      const handleSearch = useCallback(() => {
         onSearch?.(String(value))
      }, [onSearch, value])

      const handleClear = useCallback(() => {
         const e = { target: { value: '' } } as ChangeEvent<HTMLInputElement>

         onChange?.(e)
         onClear?.()
      }, [onChange, onClear])

      const handleKeyDown = useCallback(
         (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
               handleSearch()
            }
            onKeyDown?.(e)
         },
         [handleSearch, onKeyDown]
      )

      const showClearButton = endIcon && value

      const SearchButton = () => (
         <button className={styles.iconWrapper} onClick={handleSearch} type={'button'}>
            <SearchIcon width={20} height={20} fill={'currentColor'} />
         </button>
      )
      const ClearButton = () => (
         <button className={styles.iconWrapper} onClick={handleClear} type={'button'}>
            <CloseIcon width={20} height={20} />
         </button>
      )

      return (
         <Input
            className={className}
            value={value}
            onChange={onChange}
            {...rest}
            type={'search'}
            onKeyDown={handleKeyDown}
            startIcon={<SearchButton />}
            endIcon={showClearButton ? <ClearButton /> : endIcon}
         />
      )
   }
)
