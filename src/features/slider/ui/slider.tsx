import type { ComponentProps } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import { clsx } from 'clsx'

import { Input } from '@/shared/ui/input'

import styles from './slider.module.scss'

type SliderProps = {
   className?: string
   values: number[]
   onValueChange: (value: number[]) => void
} & Omit<ComponentProps<typeof RadixSlider.Root>, 'asChild' | 'value' | 'onValueChange'>

export const Slider = ({
   className,
   onValueChange,
   values,
   min = 1,
   max = 15,
   ...rest
}: SliderProps) => {
   const [minValue, maxValue] = values

   const resolvedMax = maxValue > max ? maxValue : max
   const resolvedMin = minValue < min ? minValue : min

   const handleMinValueChange = (value: string) => {
      const newMinValue = Number(value)

      if (isNaN(newMinValue)) {
         return
      }

      onValueChange([newMinValue, maxValue])
   }

   const handleMaxValueChange = (value: string) => {
      const newMaxValue = Number(value)

      if (isNaN(newMaxValue)) {
         return
      }

      onValueChange([minValue, newMaxValue])
   }

   const handleBlur = () => {
      let newMin = Math.max(resolvedMin, minValue)
      const newMax = Math.min(resolvedMax, maxValue)

      if (newMin >= newMax) {
         newMin = newMax - 1
      }

      onValueChange([newMin, newMax])
   }

   return (
      <form className={styles.sliderWrapper}>
         <div className={clsx(styles.sliderInput, 'align-center')}>
            <Input
               name={'min'}
               value={minValue}
               onBlur={handleBlur}
               onChange={e => handleMinValueChange(e.target.value)}
            />
         </div>
         <RadixSlider.Root
            className={clsx(styles.sliderRoot, className)}
            onValueChange={onValueChange}
            value={values}
            min={resolvedMin}
            max={resolvedMax}
            step={1}
            minStepsBetweenThumbs={1}
            {...rest}
            asChild={undefined}
         >
            <RadixSlider.Track className={styles.sliderTrack}>
               <RadixSlider.Range className={styles.sliderRange} />
            </RadixSlider.Track>
            <RadixSlider.Thumb className={styles.sliderThumb} />
            <RadixSlider.Thumb className={styles.sliderThumb} />
         </RadixSlider.Root>
         <div className={styles.sliderInput}>
            <Input
               name={'max'}
               value={maxValue}
               onBlur={handleBlur}
               onChange={e => handleMaxValueChange(e.target.value)}
            />
         </div>
      </form>
   )
}
