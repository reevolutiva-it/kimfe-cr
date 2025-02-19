import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeLanguage('es')}>
          {t('switch.toSpanish')}
        </button>
        <button onClick={() => changeLanguage('en')}>
          {t('switch.toEnglish')}
        </button>
      </div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default App;
