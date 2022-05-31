FROM node:16.13

RUN mkdir -p /usr/src/app
WORKDIR  /usr/src/app

ADD package.json /usr/src/app
ADD config /usr/src/app/config
ADD dist /usr/src/app/dist

RUN apt-get update


RUN npm i --prod
EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]
