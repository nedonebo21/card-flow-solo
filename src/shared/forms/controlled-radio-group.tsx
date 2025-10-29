import type { FieldValues, UseControllerProps } from 'react-hook-form'

import { useController } from 'react-hook-form'

import { RadioGroup, type RadioGroupProps } from '@/shared/ui/radio-group'

export type ControlledRadioGroupProps<T extends FieldValues> = UseControllerProps<T> &
   Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadioGroup = <T extends FieldValues>({
   name,
   rules,
   shouldUnregister,
   control,
   defaultValue,
   ...rest
}: ControlledRadioGroupProps<T>) => {
   const {
      field: { onChange, value },
   } = useController({
      name,
      rules,
      shouldUnregister,
      control,
      defaultValue,
   })

   return <RadioGroup {...{ ...rest, value, onValueChange: onChange, id: name }} />
}
