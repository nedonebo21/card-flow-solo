import type { Point, Area } from 'react-easy-crop'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { useTranslation } from 'react-i18next'

import { getCroppedImg } from '@/shared/lib'
import { Dialog } from '@/shared/ui'

import styles from './crop-image-dialog.module.scss'

type CropImageDialogProps = {
   open: boolean
   onOpenChange: (open: boolean) => void
   image: string
   onCropComplete: (croppedImage: string) => void
   aspect?: number
}

export const CropImageDialog = ({
   open,
   onOpenChange,
   image,
   onCropComplete,
   aspect = 3 / 2,
}: CropImageDialogProps) => {
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

   const { t } = useTranslation()

   const onCropChange = useCallback((crop: Point) => {
      setCrop(crop)
   }, [])

   const onCropAreaComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
   }, [])

   const handleCropComplete = async () => {
      if (!croppedAreaPixels) {
         return
      }

      try {
         const croppedImage = await getCroppedImg(image, croppedAreaPixels)

         onCropComplete(croppedImage)
         onOpenChange(false)
      } catch (e) {
         console.error('Error cropping image', e)
      }
   }

   return (
      <Dialog
         open={open}
         onOpenChange={onOpenChange}
         heading={t('crop-cover')}
         confirmButtonLabel={t('confirm')}
         cancelButtonLabel={t('cancel')}
         onConfirm={handleCropComplete}
         trigger={null}
         showCancelButton
      >
         <div className={styles.crop}>
            <Cropper
               image={image}
               crop={crop}
               aspect={aspect}
               showGrid
               onCropChange={onCropChange}
               onCropComplete={onCropAreaComplete}
               classes={{
                  containerClassName: styles.container,
                  mediaClassName: styles.crop,
                  cropAreaClassName: styles.area,
               }}
            />
         </div>
      </Dialog>
   )
}
