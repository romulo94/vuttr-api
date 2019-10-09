FROM node:10-alpine

COPY package.json yarn.lock ./

WORKDIR  /usr/app

RUN yarn

COPY . .

COPY . $APP_PATH

RUN yarn global add nodemon
RUN yarn global add sucrase
RUN yarn global add sequelize-cli

EXPOSE 3000

CMD ['yarn','start']

