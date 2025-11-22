import type { ComponentProps } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { LogoIcon } from '@/shared/ui/icons'

import styles from './header.module.scss'

type HeaderProps = Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, ...rest }: HeaderProps) => {
   return (
      <header className={clsx(styles.header, className)} {...rest}>
         <div className={clsx(styles.wrapper, 'container')}>
            <LogoIcon width={120} height={24} />
            <div className={styles.actions}>
               <Button variant={'secondary'}>Sign In</Button>
            </div>
         </div>
      </header>
   )
}
