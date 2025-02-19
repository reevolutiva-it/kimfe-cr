# Usa una imagen base de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (o pnpm-lock.yaml)
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala las dependencias
RUN npm install -g pnpm
RUN pnpm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación React
RUN pnpm build

# Etapa para servir la aplicación con un servidor web ligero (ej: nginx)
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
