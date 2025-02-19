'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// El código solo debe ejecutarse en el cliente
if (typeof window !== 'undefined') {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      ns: ['common', 'dashboard', 'agents', 'chat', 'config'],
      defaultNS: 'common',
      backend: {
        loadPath: '/messages/{{lng}}.json',
      },
      interpolation: {
        escapeValue: false
      },
      debug: true // Agregar para depurar
    }).then(() => {
      i18n.reloadResources(); // Forzar la recarga de recursos
    });
}

export default i18n;