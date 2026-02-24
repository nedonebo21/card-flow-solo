import { useTranslation } from 'react-i18next'

import { Button, TrashIcon } from '@/shared/ui'

import styles from './decks-filters.module.scss'

import { DecksSearch } from './decks-search/decks-search'
import { DecksSlider } from './decks-slider/decks-slider'
import { DecksSwitcher } from './decks-switcher/decks-switcher'

type DecksFiltersProps = {
   onClear: () => void
}

export const DecksFilters = ({ onClear }: DecksFiltersProps) => {
   const { t } = useTranslation()

   return (
      <div className={styles.filters}>
         <DecksSearch />
         <DecksSwitcher />
         <DecksSlider />
         <Button onClick={onClear} className={styles.clear} variant={'secondary'}>
            <TrashIcon width={16} height={16} />
            {t('clear-filter')}
         </Button>
      </div>
   )
}
