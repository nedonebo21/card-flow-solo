import type { ComponentProps } from 'react'

import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/ui/icons'

type LogoutButtonProps = {
   onLogout?: () => void
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const LogoutButton = ({ onLogout, variant = 'secondary', ...rest }: LogoutButtonProps) => {
   const handleLogout = () => {
      onLogout?.()
   }

   return (
      <Button onClick={handleLogout} variant={variant} {...rest}>
         <LogOutIcon width={16} height={16} />
         Logout
      </Button>
   )
}
