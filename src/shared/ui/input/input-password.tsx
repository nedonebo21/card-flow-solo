import { type ComponentProps, type KeyboardEvent, memo, useCallback, useState } from 'react'

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons'
import { Input } from '@/shared/ui/input/input'
import { Typography } from '@/shared/ui/typography'

import styles from './input.module.scss'

type InputPasswordProps = Omit<ComponentProps<typeof Input>, 'type' | 'endIcon'>

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
