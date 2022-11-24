FROM node:lts-alpine as common

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM common as production
CMD npm run start


