import type { KeyboardEvent } from 'react'

import type { InputProps } from './input'

import { memo, useCallback, useState } from 'react'

import { EyeIcon, EyeOffIcon, Typography } from '@/shared/ui'

import styles from './input.module.scss'

import { Input } from './input'

type InputPasswordProps = Omit<InputProps, 'type' | 'endIcon'>

export const InputPassword = memo(
   ({ spellCheck = false, className, disabled, ...rest }: InputPasswordProps) => {
      const [showPassword, setShowPassword] = useState(false)
      const [isCapslockOn, setIsCapslockOn] = useState(false)

      const type = showPassword ? 'text' : 'password'

      const togglePassword = useCallback(() => {
         setShowPassword(prev => !prev)
      }, [])

      const handleCapslockOn = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
         setIsCapslockOn(e.getModifierState('CapsLock'))
      }, [])

      const passwordToggleButton = (
         <button
            disabled={disabled}
            className={styles.iconWrapper}
            type={'button'}
            onClick={togglePassword}
         >
            {showPassword ? (
               <EyeOffIcon width={20} height={20} color={'currentColor'} />
            ) : (
               <EyeIcon width={20} height={20} color={'currentColor'} />
            )}
         </button>
      )

      return (
         <>
            <Input
               className={className}
               spellCheck={spellCheck}
               {...rest}
               onKeyDown={e => {
                  rest.onKeyDown?.(e)
                  handleCapslockOn(e)
               }}
               type={type}
               endIcon={passwordToggleButton}
            />
            {isCapslockOn && <Typography variant={'warning'}>Caps Lock включен</Typography>}
         </>
      )
   }
)
