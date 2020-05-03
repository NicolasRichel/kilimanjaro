FROM node:lts-alpine

ARG CONFIG

WORKDIR /
RUN mkdir data

WORKDIR /usr/src/app
# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile
# Copy sources
COPY src/ ./
RUN rm .config*
COPY src/.config.${CONFIG} .config

EXPOSE 9001
ENTRYPOINT node start-server.js
