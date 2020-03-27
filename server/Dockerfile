FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --frozen-lockfile

COPY . .
COPY .env.prod .env

EXPOSE 80
ENTRYPOINT [ "node", "server.js" ]
