FROM node:16-alpine

WORKDIR /usr/src/client

COPY package*.json yarn.lock ./
RUN yarn
ENV PATH /usr/src/client/node_modules/.bin:$PATH

COPY . /usr/src/client

CMD [ "yarn", "start" ]
#RUN yarn build
