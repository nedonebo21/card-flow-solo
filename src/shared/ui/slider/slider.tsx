import type { ComponentProps, KeyboardEvent } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import { Input } from '@/shared/ui/input'

import styles from './slider.module.scss'

type SliderProps = {
   className?: string
   values: number[]
   onValueCommit: (value: number[]) => void
} & Omit<
   ComponentProps<typeof RadixSlider.Root>,
   'asChild' | 'value' | 'onValueChange' | 'onValueCommit'
>

export const Slider = ({
   className,
   onValueCommit,
   values,
   min = 1,
   max = 15,
   disabled,
   ...rest
}: SliderProps) => {
   const [localValues, setLocalValues] = useState(values)
   const [localMin, localMax] = localValues

   useEffect(() => {
      setLocalValues(values)
   }, [values])

   const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues)
   }

   const handleValueCommit = (newValues: number[]) => {
      setLocalValues(newValues)
      onValueCommit(newValues)
   }

   const handleMinValueChange = (value: string) => {
      const newMinValue = Number(value)

      if (isNaN(newMinValue)) {
         return
      }

      setLocalValues([newMinValue, localMax])
   }

   const handleMaxValueChange = (value: string) => {
      const newMaxValue = Number(value)

      if (isNaN(newMaxValue)) {
         return
      }

      setLocalValues([localMin, newMaxValue])
   }

   const handleCommitInput = () => {
      let newMin = Math.max(min, localMin)
      let newMax = Math.min(max, localMax)

      if (newMin >= newMax) {
         newMin = newMax
      }

      if (newMax > max) {
         newMax = max
      }

      setLocalValues([newMin, newMax])
      onValueCommit([newMin, newMax])
   }

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         ;(e.target as HTMLInputElement).blur()
      }
   }

   return (
      <nav className={styles.sliderWrapper}>
         <div className={clsx(styles.sliderInput, 'align-center')}>
            <Input
               name={'min'}
               disabled={disabled}
               value={localMin}
               onBlur={handleCommitInput}
               onKeyDown={handleKeyDown}
               onChange={e => handleMinValueChange(e.target.value)}
            />
         </div>
         <RadixSlider.Root
            className={clsx(styles.sliderRoot, disabled && styles.disabled, className)}
            onValueChange={handleValueChange}
            onValueCommit={handleValueCommit}
            disabled={disabled}
            value={localValues}
            min={min}
            max={max}
            step={1}
            minStepsBetweenThumbs={1}
            {...rest}
            asChild={undefined}
         >
            <RadixSlider.Track aria-disabled={disabled} className={styles.sliderTrack}>
               <RadixSlider.Range aria-disabled={disabled} className={styles.sliderRange} />
            </RadixSlider.Track>
            <RadixSlider.Thumb aria-disabled={disabled} className={styles.sliderThumb} />
            <RadixSlider.Thumb aria-disabled={disabled} className={styles.sliderThumb} />
         </RadixSlider.Root>
         <div className={styles.sliderInput}>
            <Input
               name={'max'}
               disabled={disabled}
               value={localMax}
               onBlur={handleCommitInput}
               onKeyDown={handleKeyDown}
               onChange={e => handleMaxValueChange(e.target.value)}
            />
         </div>
      </nav>
   )
}
