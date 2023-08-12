# Commands are executed sequentially
# Base image
FROM node:18-alpine3.18

# Define working directory
WORKDIR /app

# Copy package.json, package-lock.json into working directory
# After that command RUN will be available
COPY package*.json .

# Install node modules into node_modules directory inside image
RUN npm install

COPY prisma ./prisma

# Run directly because a Docker-container is used
# Prisma Client creation
RUN npx prisma generate

# Add source code from current directory into the image
COPY . .

EXPOSE ${PORT}

# Command to run when image is run inside of a container
CMD [ "npm", "run", "start:dev" ]
