FROM node:lts-alpine

ARG CONFIG

WORKDIR /usr/src/app
# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile
# Copy sources
COPY src/ ./
COPY src/.config.${CONFIG} .config
RUN rm .config.*

EXPOSE 9001
ENTRYPOINT node server.js
