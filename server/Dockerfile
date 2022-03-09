FROM node:16-alpine

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package*.json yarn.lock ./
RUN npm install
ENV PATH /usr/src/api/node_modules/.bin:$PATH

COPY . ./

CMD [ "npm", "run", "start" ]

