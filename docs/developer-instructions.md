# Instrucciones para Desarrolladores

## Introducción

Este documento proporciona una guía completa para los desarrolladores que trabajan en el proyecto AI Agent Configuration. Aquí encontrarás información sobre cómo configurar tu entorno de desarrollo, ejecutar pruebas y contribuir al proyecto.

## Entorno de Desarrollo

### Prerrequisitos

* [Node.js](https://nodejs.org/) (versión 18 o superior)
* [pnpm](https://pnpm.io/) (versión 8 o superior)
* [Docker](https://www.docker.com/) (opcional, para el entorno de contenedorización)

### Configuración

1. Clona el repositorio:

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. Instala las dependencias:

    ```bash
    pnpm install
    ```

3. Copia el archivo `.env.example` a `.env` y ajusta las variables de entorno necesarias.

### Variables de Entorno

El proyecto utiliza variables de entorno gestionadas con [`@t3-oss/env-nextjs`](https://github.com/t3-oss/env-nextjs). Las variables de entorno se definen en [env.js](http://_vscodecontentref_/0).

* [NODE_ENV](http://_vscodecontentref_/1): Establecer a `development`, `test` o `production` para especificar el entorno.

**Nota:** Durante la construcción de Docker, puedes usar la variable de entorno [SKIP_ENV_VALIDATION](http://_vscodecontentref_/2) para omitir la validación del entorno.

### Comandos Comunes

* **Iniciar el servidor de desarrollo:** `pnpm dev`
* **Construir para producción:** `pnpm build`
* **Iniciar el servidor de producción:** `pnpm start`
* **Ejecutar pruebas:** `pnpm test`
* **Lint el código:** `pnpm lint`
* **Corregir problemas de lint:** `pnpm lint:fix`
* **Formatear el código:** `pnpm format:write`
* **Verificar el formato:** `pnpm format:check`

## Estructura del Proyecto

* `src/app`: Contiene el código principal de la aplicación, incluyendo páginas y layouts.
* `src/components`: Componentes React reutilizables.
* `src/lib`: Funciones de utilidad y módulos auxiliares, incluyendo [store.ts](http://_vscodecontentref_/3).
* `src/styles`: Archivos CSS y de estilo.
* `src/types`: Definiciones de tipos de TypeScript.
* `public/messages`: Archivos de mensajes de internacionalización (i18n).

## Linting y Formateo

Este proyecto utiliza ESLint, Stylelint y Prettier para el linting y formateo.

* Ejecuta el script [lint.sh](http://_vscodecontentref_/4) para realizar comprobaciones de lint:

    ```bash
    ./lint.sh
    ```

## Pruebas

Este proyecto utiliza Jest para las pruebas.

* Para ejecutar las pruebas, utiliza el siguiente comando:

    ```bash
    pnpm test
    ```

## Docker

El proyecto incluye un [Dockerfile](http://_vscodecontentref_/5) para la contenedorización con Docker.

1. Construye la imagen de Docker:

    ```bash
    docker build -t ai-agent-configuration .
    ```

2. Ejecuta el contenedor de Docker:

    ```bash
    docker run -d -p 3000:3000 ai-agent-configuration
    ```

    La aplicación estará disponible en `http://localhost:3000`.

## Proceso de Contribución

1. Crea una rama para tu contribución:

    ```bash
    git checkout -b feature/<nombre_de_la_caracteristica>
    ```

2. Realiza tus cambios y commitea con mensajes descriptivos.

3. Sube tu rama:

    ```bash
    git push origin feature/<nombre_de_la_caracteristica>
    ```

4. Crea una solicitud de extracción (pull request) a la rama [main](http://_vscodecontentref_/6).

### Guía de Estilo de Código

* Sigue las convenciones de código existentes.
* Escribe pruebas unitarias para tu código.
* Asegúrate de que todas las pruebas pasen antes de enviar una solicitud de extracción.
* Utiliza mensajes de commit claros y descriptivos.

## Despliegue

Sigue estos pasos para desplegar el proyecto:

1. Construye el proyecto:

    ```bash
    pnpm build
    ```

2. Inicia el servidor de producción:

    ```bash
    pnpm start
    ```

## Contacto

Si tienes alguna pregunta o necesitas ayuda, contacta con el equipo de desarrollo.
