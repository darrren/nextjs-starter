import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { supportedLngs, defaultNS } from './settings'

// Check if we're on the server (no window object)
const isServer = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`@/i18n/locales/${language}/${namespace}.json`)))
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: supportedLngs[0],
    supportedLngs: supportedLngs,
    partialBundledLanguages: true,
    // defaultNS: defaultNS,
    ns: defaultNS,
    detection: {
      order: isServer ? [] : ['path'],
      lookupFromPathIndex: process.env.NODE_ENV === 'development' ? 0 : 1
    },
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18next;