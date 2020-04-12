FROM node:lts-alpine

ENV CONFIG_FILE .config


WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --frozen-lockfile

COPY . .
COPY ${CONFIG_FILE} .config

EXPOSE 80
ENTRYPOINT [ "node", "server.js" ]
