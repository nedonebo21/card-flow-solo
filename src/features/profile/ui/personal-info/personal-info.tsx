import { Button } from '@/shared/ui/button'
import { LogOutIcon, PencilIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './edit-personal-info.module.scss'

type PersonalInfoProps = {
   nickname: string
   onEditMode: () => void
   email: string
}

export const PersonalInfo = ({ nickname, onEditMode, email }: PersonalInfoProps) => {
   return (
      <div className={styles.info}>
         <div className={styles.editable}>
            <Typography className={styles.nickname} variant={'h2'}>
               {nickname}
            </Typography>
            <Button
               className={styles.nicknameEdit}
               onClick={onEditMode}
               variant={'ghost'}
               size={'icon'}
            >
               <PencilIcon width={16} height={16} />
            </Button>
         </div>
         <Typography className={styles.email} variant={'body2'}>
            {email}
         </Typography>
         <div className={styles.footer}>
            <Button variant={'secondary'}>
               <LogOutIcon width={16} height={16} />
               Logout
            </Button>
         </div>
      </div>
   )
}
