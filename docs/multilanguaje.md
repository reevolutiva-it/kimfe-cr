## Estado Actual de Implementación de Traducciones

### Problemas Identificados

1. **Conflicto de Sistemas de Internacionalización**
   * Se detectan múltiples implementaciones:
     * i18next con react-i18next
     * LanguageProvider personalizado
     * Archivos de configuración duplicados

2. **Estructura de Archivos**
   * `/src/components/language-provider.tsx`: Implementación personalizada
   * `/src/i18n.js`: Configuración de i18next
   * `/public/messages/*.json`: Archivos de traducción
   * Conflicto entre implementaciones que causa que las traducciones no funcionen

3. **Problemas Específicos**
   * No se cargan los mensajes del JSON correctamente
   * El switch de idioma cambia pero no actualiza los textos
   * Las traducciones están duplicadas en diferentes archivos
   * No hay sincronización entre localStorage y el estado global

### Plan de Corrección

1. **Unificar Sistema de Traducciones**

   ```typescript
   // Eliminar uno de los dos sistemas:
   // Opción 1: Mantener i18next (recomendado)
   // Opción 2: Mantener LanguageProvider personalizado
   ```

2. **Corrección de Archivos**
   * Mantener solo un sistema de configuración
   * Eliminar archivos redundantes
   * Actualizar imports en componentes

3. **Implementación Recomendada (i18next)**

   ```typescript
   // 1. Configuración en src/i18n.ts
   import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import Backend from 'i18next-http-backend';

   i18n
     .use(Backend)
     .use(initReactI18next)
     .init({
       lng: 'en',
       fallbackLng: 'en',
       ns: ['common'],
       defaultNS: 'common',
       backend: {
         loadPath: '/messages/{{lng}}.json',
       },
     });

   // 2. Uso en componentes
   import { useTranslation } from 'react-i18next';
   
   function Component() {
     const { t } = useTranslation();
     return <div>{t('common.dashboard')}</div>;
   }
   ```

4. **Estructura de Archivos Final**

   ```
   src/
   ├── i18n.ts
   ├── components/
   │   └── language-switcher.tsx
   public/
   └── messages/
       ├── en.json
       └── es.json
   ```

### Pasos de Implementación

1. **Limpieza de Código**
   * Eliminar `language-provider.tsx`
   * Eliminar imports no utilizados
   * Actualizar referencias en componentes

2. **Actualización de Dependencias**

   ```bash
   pnpm remove @types/i18next @types/react-i18next
   pnpm add i18next react-i18next i18next-http-backend
   pnpm add -D @types/i18next @types/react-i18next
   ```

3. **Actualización de Componentes**
   * Migrar componentes a usar useTranslation
   * Actualizar language-switcher.tsx
   * Verificar carga inicial de idioma

4. **Pruebas y Verificación**
   * Probar cambio de idioma
   * Verificar persistencia en localStorage
   * Comprobar carga inicial de traducciones

### Solución de Problemas Comunes

* Error "Translations not loaded": Verificar rutas de archivos JSON
* Error "Missing key": Revisar estructura de archivos de traducción
* Error "Cannot read property of undefined": Verificar inicialización de i18next

### Mantenimiento

* Mantener archivos de traducción sincronizados
* Documentar nuevas claves de traducción
* Revisar periódicamente missing translations
* Implementar sistema de validación de claves
