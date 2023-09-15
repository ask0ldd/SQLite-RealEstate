FROM node:18

# create a directory to hold the application code inside the image
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# bundle your app's source code inside the Docker image
COPY . .

ENV PORT = 5678
EXPOSE 5678

CMD [ "node", "server.js" ]
