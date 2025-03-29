# Usar la imagen base de Node 18
FROM node:18

# Instalar dependencias necesarias para compilar bcrypt (y otros módulos nativos si es necesario)
RUN apt-get update && apt-get install -y build-essential python3

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias primero para aprovechar la cache de Docker
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto 3000 para que la aplicación esté accesible desde fuera del contenedor
EXPOSE 3000

# Definir el comando que se ejecutará al iniciar el contenedor
CMD ["npm", "start"]