# Utiliza la imagen de node 12 como base.
FROM node:12

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

#Creamos usuario unqfy
RUN useradd -ms /bin/bash unqfy

# Crea un directorio y nos movemos ahí
WORKDIR /home/unqfy/monitor

# Copia el package.json package-lock.json en /home/unqfy/monitor
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 7100 donde corre la aplicación
EXPOSE 7100

# Copia los fuentes dentro del container
COPY . /home/unqfy/monitor

# Le da permisos al usuario unqfy para escribir en /home/unqfy/monitor
RUN chown -R unqfy:users /home/unqfy/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER unqfy

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "npm", "start" ]
