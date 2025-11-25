import type { Area } from 'react-easy-crop'

export const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<string> => {
   return new Promise((resolve, reject) => {
      const image = new Image()

      image.src = imageSrc

      image.onload = () => {
         const canvas = document.createElement('canvas')
         const ctx = canvas.getContext('2d')

         if (!ctx) {
            reject(new Error('No 2d context'))

            return
         }

         canvas.width = pixelCrop.width
         canvas.height = pixelCrop.height

         ctx.imageSmoothingQuality = 'high'

         ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
         )

         // Конвертируем в blob с высоким качеством
         canvas.toBlob(
            blob => {
               if (!blob) {
                  reject(new Error('Canvas is empty'))

                  return
               }
               const url = URL.createObjectURL(blob)

               resolve(url)
            },
            'image/jpeg',
            0.95 // Качество JPEG 95%
         )
      }

      image.onerror = () => {
         reject(new Error('Image loading error'))
      }
   })
}
