import { StartFilledIcon } from '@/shared/ui/icons'

import styles from './rating.module.scss'

type RatingProps = {
   value: number
}
export const Rating = ({ value = 0 }: RatingProps) => {
   const ratingValue = value as 0 | 1 | 2 | 3 | 4 | 5

   return (
      <div className={styles.wrapper}>
         <Star selected={ratingValue > 0} />
         <Star selected={ratingValue > 1} />
         <Star selected={ratingValue > 2} />
         <Star selected={ratingValue > 3} />
         <Star selected={ratingValue > 4} />
      </div>
   )
}

type StarProps = {
   selected: boolean
}

const Star = (props: StarProps) => {
   return (
      <>
         {props.selected ? (
            <StartFilledIcon width={20} height={20} className={styles.selected} />
         ) : (
            <StartFilledIcon width={20} height={20} />
         )}
      </>
   )
}
