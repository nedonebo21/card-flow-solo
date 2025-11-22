import type { Control, FieldValues, UseControllerProps } from 'react-hook-form'

import type { RadioGroupProps } from '@/shared/ui'

import { useController } from 'react-hook-form'

import { RadioGroup } from '@/shared/ui'

export type ControlledRadioGroupProps<T extends FieldValues> = Omit<
   UseControllerProps<T>,
   'control'
> & {
   control: Control<T>
} & Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

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
