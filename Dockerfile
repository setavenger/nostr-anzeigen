FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./ ./

RUN npm install
RUN npm run build



FROM nginx
COPY /build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
