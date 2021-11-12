# Utiliza la imagen de node 12 como base.
FROM node:12

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/unqfy/unqfy

# Copia el package.json package-lock.json en /home/unqfy/unqfy
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 7070 donde corre la aplicación
EXPOSE 7070

# Copia los fuentes dentro del container
COPY . /home/unqfy/unqfy

# Le da permisos al usuario unqfy para escribir en /home/unqfy/unqfy
RUN chown -R unqfy:users /home/unqfy/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER unqfy

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "npm", "start" ]
