import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

import enTranslations from '@/shared/lib/i18n/locales/en.json'
import ruTranslations from '@/shared/lib/i18n/locales/ru.json'

export const resources = {
   en: { translation: enTranslations },
   ru: { translation: ruTranslations },
}

i18n.use(HttpBackend).use(LanguageDetector).use(initReactI18next).init({
   debug: false,
   fallbackLng: 'en',
   resources,
})

export default i18n
