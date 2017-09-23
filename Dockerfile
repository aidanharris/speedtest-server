FROM node:alpine

ADD . /var/www

WORKDIR /var/www

ENV NODE_ENV=production

RUN apk add --no-cache \
      python \
      speedtest-cli \
      make \
      g++ \
      sqlite-dev \
      sqlite-libs && \
    yarn && \
    apk del --no-cache \
      make \
      g++ \
      sqlite-dev

CMD node index.js
