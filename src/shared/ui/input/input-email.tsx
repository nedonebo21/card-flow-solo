import type { InputProps } from './input'

import { Input } from './input'

type InputEmailProps = Omit<InputProps, 'type'>

export const InputEmail = ({ spellCheck = false, ...rest }: InputEmailProps) => {
   return <Input spellCheck={spellCheck} {...rest} type={'email'} />
}
