### Build Stage
FROM node:lts-alpine AS build

ARG CONFIG

WORKDIR /app
# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --frozen-lockfile
# Copy sources
COPY . ./
RUN rm src/.config*.js
COPY src/.config.${CONFIG}.js src/.config.js
# Build
RUN yarn build


### Run Stage
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
