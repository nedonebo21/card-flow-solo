import type { ComponentProps } from 'react'

import { Link } from 'react-router-dom'

import { clsx } from 'clsx'

import { useMeQuery } from '@/entities/user'
import { LogoutButton } from '@/features/auth'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Dropdown, LogoIcon, Typography, UserFilledIcon } from '@/shared/ui'

import styles from './header.module.scss'

type HeaderProps = Omit<ComponentProps<'header'>, 'children'>

export const Header = ({ className, ...rest }: HeaderProps) => {
   const { isError, data: userData } = useMeQuery()
   const name = userData?.name ?? 'Name'
   const email = userData?.email ?? 'example@example.com'
   const isAuth = !isError
   const avatar = userData?.avatar
   const hasAvatar = !!avatar && avatar.length > 0

   return (
      <header className={clsx(styles.header, className)} {...rest}>
         <div className={clsx(styles.wrapper, 'container')}>
            <Button className={styles.link} variant={'link'} as={Link} to={ROUTE_PATHS.HOME}>
               <LogoIcon color={'white'} width={120} height={24} />
            </Button>
            <div className={styles.actions}>
               {isAuth ? (
                  <Dropdown name={name} triggerIcon={hasAvatar ? avatar : null}>
                     <Dropdown.Label email={email} nickname={name} avatarUrl={userData?.avatar} />
                     <Dropdown.Item>
                        <Button variant={'ghost'} as={Link} to={ROUTE_PATHS.PROFILE}>
                           <UserFilledIcon width={16} height={16} />
                           <Typography variant={'caption'}>My Profile</Typography>
                        </Button>
                     </Dropdown.Item>
                     <Dropdown.Item>
                        <LogoutButton variant={'ghost'}>
                           <Typography variant={'caption'}>Sign Out</Typography>
                        </LogoutButton>
                     </Dropdown.Item>
                  </Dropdown>
               ) : (
                  <Button variant={'secondary'} as={Link} to={ROUTE_PATHS.SIGN_IN}>
                     Sign In
                  </Button>
               )}
            </div>
         </div>
      </header>
   )
}
