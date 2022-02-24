FROM node:16-alpine

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package*.json yarn.lock ./
RUN npm install

COPY . ./

CMD [ "npm", "run", "start" ]

