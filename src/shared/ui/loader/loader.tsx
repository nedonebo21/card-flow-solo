import { clsx } from 'clsx'

import { LoaderIcon } from '@/shared/ui'

import styles from './loader.module.scss'

type LoaderProps = {
   className?: string
}

export const Loader = ({ className }: LoaderProps) => {
   return (
      <div className={clsx(styles.loader, className)}>
         <LoaderIcon width={44} height={44} />
      </div>
   )
}
