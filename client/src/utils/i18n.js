/**
 * i18n
 *
 * @author: Jeff Lee
 * @createdAt: 2018/01/04
 */

import i18n from 'i18next';
import Backend from 'i18next-fetch-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import cookie from 'react-cookies';

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    }
  });

if (!cookie.load('locale')) {
  cookie.save('en');
}
i18n.changeLanguage(cookie.load('locale'));

export function toggleLanguage() {
  switch (cookie.load('locale')) {
    case 'zh':
      cookie.save('locale', 'en'); break;
    case 'en':
      cookie.save('locale', 'zh'); break;
    default:
      cookie.save('locale', 'zh'); break;
  }
  i18n.changeLanguage(cookie.load('locale'));
}

export default i18n;
