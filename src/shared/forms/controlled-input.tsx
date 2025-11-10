import type { ComponentType } from 'react'
import type { Control, FieldValues, UseControllerProps } from 'react-hook-form'

import type { InputProps } from '@/shared/ui/input'

import { useController } from 'react-hook-form'

import { Input } from '@/shared/ui/input'

export type ControlledInputProps<T extends FieldValues> = Omit<UseControllerProps<T>, 'control'> & {
   control: Control<T>
   InputComponent?: ComponentType<InputProps>
} & Omit<InputProps, 'onChange' | 'value' | 'onBlur'>

export const ControlledInput = <T extends FieldValues>({
   name,
   rules,
   shouldUnregister,
   control,
   defaultValue,
   InputComponent = Input,
   ...rest
}: ControlledInputProps<T>) => {
   const {
      field: { onChange, value, onBlur },
   } = useController({
      name,
      rules,
      shouldUnregister,
      control,
      defaultValue,
   })

   return <InputComponent {...{ ...rest, value, onChange, onBlur, id: name }} />
}
