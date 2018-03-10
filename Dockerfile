FROM node:9.8.0

WORKDIR /srv

ADD package-lock.json /srv/package-lock.json
ADD package.json /srv/package.json

RUN npm install

ADD ./views /srv/views
ADD server.js /srv/server.js
ADD uploader.js /srv/uploader.js
