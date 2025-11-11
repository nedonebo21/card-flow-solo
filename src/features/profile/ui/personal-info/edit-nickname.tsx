import type { NicknameFormValues } from '@/features/profile/model'

import { type SubmitHandler, useWatch } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { nicknameSchema } from '@/features/profile/model'
import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'

import styles from '@/features/profile/ui/personal-info/edit-personal-info.module.scss'

type Props = {
   nickname: string
   onSubmit: SubmitHandler<NicknameFormValues>
   onCancel: () => void
}

export const EditNickname = ({ nickname, onSubmit, onCancel }: Props) => {
   const {
      handleSubmit,
      control,
      formState: { errors, isDirty },
   } = useForm<NicknameFormValues>({
      resolver: zodResolver(nicknameSchema),
      defaultValues: {
         nickname,
      },
   })

   const currentNickname = useWatch({
      control,
      name: 'nickname',
      defaultValue: nickname,
   })

   const maxLength = nicknameSchema.shape.nickname.maxLength

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <ControlledInput
            control={control}
            name={'nickname'}
            label={`Nickname ${currentNickname.length}/${maxLength}`}
            errorMessage={errors.nickname?.message}
         />
         <div className={styles.buttons}>
            <Button
               onClick={onCancel}
               variant={'secondary'}
               className={styles.save}
               fullWidth
               type={'button'}
            >
               Back
            </Button>
            <Button className={styles.save} disabled={!isDirty} fullWidth type={'submit'}>
               Save Changes
            </Button>
         </div>

         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
