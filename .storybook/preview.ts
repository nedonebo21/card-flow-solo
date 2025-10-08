import type { Preview } from '@storybook/react-vite'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@/shared/styles/index.scss'

const preview: Preview = {
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
   },
}

export default preview
