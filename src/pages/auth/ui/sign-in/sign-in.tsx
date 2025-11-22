import { clsx } from 'clsx'

import { SignInForm } from '@/features/auth/ui/sign-in-form'

type Props = { className?: string }
export const SignIn = ({ className }: Props) => {
   return (
      <div className={clsx('container', className)}>
         <SignInForm />
      </div>
   )
}
