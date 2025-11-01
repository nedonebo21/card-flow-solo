import type { FieldValues } from 'react-hook-form'

import type { UseControllerProps } from '@/shared/lib/types'
import type { CheckboxProps } from '@/shared/ui/checkbox'

import { useController } from 'react-hook-form'

import { Checkbox } from '@/shared/ui/checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
   Omit<CheckboxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
   name,
   rules,
   shouldUnregister,
   control,
   defaultValue,
   ...rest
}: ControlledCheckboxProps<T>) => {
   const {
      field: { onChange, value },
   } = useController({
      name,
      rules,
      shouldUnregister,
      control,
      defaultValue,
   })

   return <Checkbox {...{ ...rest, checked: value, onCheckedChange: onChange, id: name }} />
}
