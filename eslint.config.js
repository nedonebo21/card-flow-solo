import { defineConfig } from 'eslint/config'

import base from '@philian73/eslint-config'
import vite from '@philian73/eslint-config/vite'
import storybook from 'eslint-plugin-storybook'

export default defineConfig([
   ...base,
   ...vite,
   storybook.configs['flat/recommended'],
   {
      ignores: ['.storybook/**/*.{js,ts,tsx}']
   }
])
