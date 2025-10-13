import type { ComponentProps } from 'react'

import { Input } from '@/shared/ui/input/input'

type InputEmailProps = Omit<ComponentProps<typeof Input>, 'type'>

export const InputEmail = ({ spellCheck = false, ...rest }: InputEmailProps) => {
   return <Input {...rest} spellCheck={spellCheck} type={'email'} />
}
