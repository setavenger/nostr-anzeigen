FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY ./ ./

RUN npm install
RUN npm run build


FROM nginx
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d
