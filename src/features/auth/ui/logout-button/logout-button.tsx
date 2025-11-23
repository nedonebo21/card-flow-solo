import type { ComponentProps } from 'react'

import { useLogoutMutation } from '@/features/auth/api'
import { Button, Typography } from '@/shared/ui'
import { LogOutIcon } from '@/shared/ui/icons'

type LogoutButtonProps = {
   onLogout?: () => void
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const LogoutButton = ({ onLogout, variant = 'secondary', ...rest }: LogoutButtonProps) => {
   const [logout] = useLogoutMutation()

   const handleLogout = () => {
      if (onLogout) {
         onLogout()
      } else {
         logout()
      }
   }

   return (
      <Button onClick={handleLogout} variant={variant} {...rest}>
         <LogOutIcon width={16} height={16} />
         <Typography variant={'caption'}>Sign out</Typography>
      </Button>
   )
}
