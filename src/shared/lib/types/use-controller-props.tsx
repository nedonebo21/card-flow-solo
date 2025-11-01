import type {
   Control,
   FieldPath,
   FieldPathValue,
   FieldValues,
   RegisterOptions,
} from 'react-hook-form'

export type UseControllerProps<
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
   TTransformedValues = TFieldValues,
> = {
   name: TName
   rules?: Omit<
      RegisterOptions<TFieldValues, TName>,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
   >
   shouldUnregister?: boolean
   defaultValue?: FieldPathValue<TFieldValues, TName>
   control: Control<TFieldValues, any, TTransformedValues>
   disabled?: boolean
}
