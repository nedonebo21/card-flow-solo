import react from '@vitejs/plugin-react-swc'

import path from 'path'

import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      svgr({
         svgrOptions: { memo: true, icon: true, ref: true, exportType: 'default', svgo: false },
      }),
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
})
