# Use the official image as a parent image.
FROM node:12

# Set the working directory.
WORKDIR /home/unqfy/logging

# Copy the file from your host to your current location.
COPY package.json .
COPY package-lock.json .

# Run the command inside your image filesystem.
RUN ["npm", "install"]

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 7080

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . /home/unqfy/logging/

# Give node user permissions to write to /home/unqfy/ 
RUN chown -R unqfy:users /home/unqfy/

# Enable the user node. By default, the containers run the commands with the root user.
USER unqfy

# Run the specified command within the container.
CMD [ "npm", "start" ]
