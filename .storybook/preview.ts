import type { Preview } from '@storybook/react-vite'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@/shared/styles/index.scss'
import { themes } from 'storybook/theming'

const preview: Preview = {
   parameters: {
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
         },
      },
      docs: {
         theme: themes.dark,
      },
   },
}

export default preview
