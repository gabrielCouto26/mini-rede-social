FROM node:17.9.1

ENV APP_PATH /app

EXPOSE 3000

WORKDIR $APP_PATH

COPY package.json $APP_PATH
COPY package-lock.json $APP_PATH

RUN npm install

COPY docker-entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "/usr/bin/entrypoint.sh" ]

COPY . $APP_PATH