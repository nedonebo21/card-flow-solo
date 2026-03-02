import type { resources } from '@/shared/lib/i18n/i18n'

declare module 'i18next' {
   interface CustomTypeOptions {
      defaultNS: 'translation'
      resources: typeof resources.en
   }
}
