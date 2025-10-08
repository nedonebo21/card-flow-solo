import { defineConfig } from 'eslint/config'

import base from '@philian73/eslint-config'
import vite from '@philian73/eslint-config/vite'

export default defineConfig([
  ...base,
  ...vite,
])

