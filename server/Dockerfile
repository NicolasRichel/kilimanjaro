FROM node:lts-alpine

ENV CONFIG_FILE prod


WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile
COPY . .

EXPOSE 9001
ENTRYPOINT node server.js ${CONFIG_FILE}
