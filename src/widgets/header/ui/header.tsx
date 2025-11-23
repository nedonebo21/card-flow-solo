import type { ComponentProps } from 'react'

import { Link } from 'react-router-dom'

import { clsx } from 'clsx'

import { useMeQuery } from '@/entities/user/api'
import { Button, LogoIcon } from '@/shared/ui'

import styles from './header.module.scss'

type HeaderProps = Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, ...rest }: HeaderProps) => {
   const { isError } = useMeQuery()
   const isAuth = !isError

   return (
      <header className={clsx(styles.header, className)} {...rest}>
         <div className={clsx(styles.wrapper, 'container')}>
            <LogoIcon width={120} height={24} />
            <div className={styles.actions}>
               {isAuth ? (
                  <Button variant={'secondary'}>Profile</Button>
               ) : (
                  <Button variant={'secondary'} as={Link} to={'/sign-in'}>
                     Sign In
                  </Button>
               )}
            </div>
         </div>
      </header>
   )
}
