import { useMeQuery } from '@/entities/user/api'

import { ViewPersonalInfo } from './view-personal-info'

export const Profile = () => {
   const { data } = useMeQuery()

   return (
      <ViewPersonalInfo
         email={data?.email}
         isEmailVerified={data?.isEmailVerified}
         username={data?.name}
         avatarUrl={data?.avatar}
      />
   )
}
