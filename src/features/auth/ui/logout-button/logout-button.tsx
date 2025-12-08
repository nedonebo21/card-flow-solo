import type { ComponentProps } from 'react'

import { useNavigate } from 'react-router-dom'

import { useLogoutMutation } from '@/features/auth/api'
import { Button } from '@/shared/ui'
import { LogOutIcon } from '@/shared/ui/icons'

type LogoutButtonProps = {
   onLogout?: () => void
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const LogoutButton = ({
   onLogout,
   variant = 'secondary',
   children,
   ...rest
}: LogoutButtonProps) => {
   const [logout] = useLogoutMutation()

   const navigate = useNavigate()

   const handleLogout = async () => {
      if (onLogout) {
         onLogout()
      } else {
         try {
            await logout().unwrap()
            navigate('/')
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <Button onClick={handleLogout} variant={variant} {...rest}>
         <LogOutIcon width={16} height={16} />
         {children}
      </Button>
   )
}
