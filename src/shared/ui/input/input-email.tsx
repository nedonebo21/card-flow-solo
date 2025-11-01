import type { InputProps } from '@/shared/ui/input/input'

import { Input } from '@/shared/ui/input/input'

type InputEmailProps = Omit<InputProps, 'type'>

export const InputEmail = ({ spellCheck = false, ...rest }: InputEmailProps) => {
   return <Input spellCheck={spellCheck} {...rest} type={'email'} />
}
