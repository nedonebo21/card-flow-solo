import {
   type ComponentProps,
   type KeyboardEvent,
   memo,
   useCallback,
   useMemo,
   useState,
} from 'react'

import { EyeIcon, EyeOffIcon } from '@/shared/ui/icons'
import { Input } from '@/shared/ui/input/input'
import { Typography } from '@/shared/ui/typography'

import styles from './input.module.scss'

type InputPasswordProps = Omit<ComponentProps<typeof Input>, 'type' | 'endIcon'>

export const InputPassword = memo(
   ({ spellCheck = false, className, ...rest }: InputPasswordProps) => {
      const [showPassword, setShowPassword] = useState(false)
      const [isCapslock, setIsCapslock] = useState(false)

      const togglePassword = useCallback(() => {
         setShowPassword(prev => !prev)
      }, [])

      const handleCapslock = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
         setIsCapslock(e.getModifierState('CapsLock'))
      }, [])

      const passwordToggleButton = useMemo(
         () =>
            showPassword ? (
               <button className={styles.iconWrapper} type={'button'}>
                  <EyeOffIcon
                     width={20}
                     height={20}
                     fill={'currentColor'}
                     onClick={togglePassword}
                  />
               </button>
            ) : (
               <button className={styles.iconWrapper} type={'button'}>
                  <EyeIcon width={20} height={20} fill={'currentColor'} onClick={togglePassword} />
               </button>
            ),
         [showPassword, togglePassword]
      )

      return (
         <>
            <Input
               className={className}
               spellCheck={spellCheck}
               {...rest}
               onKeyUp={handleCapslock}
               onKeyDown={handleCapslock}
               type={showPassword ? 'text' : 'password'}
               endIcon={passwordToggleButton}
            />
            {isCapslock && <Typography variant={'warning'}>Caps Lock включен</Typography>}
         </>
      )
   }
)
