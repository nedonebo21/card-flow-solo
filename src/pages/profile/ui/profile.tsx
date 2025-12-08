import { useMeQuery } from '@/entities/user/api'
import { ViewPersonalInfo } from '@/pages/profile/ui/view-personal-info'

export const Profile = () => {
   const { data } = useMeQuery()

   return <ViewPersonalInfo email={data?.email} username={data?.name} avatarUrl={data?.avatar} />
}
