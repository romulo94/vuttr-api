FROM node:12.5.0-slim

WORKDIR  /srv/app

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY package.json yarn.lock ./

COPY . .

RUN yarn

RUN yarn global add nodemon
RUN yarn global add sucrase
RUN yarn global add sequelize-cli
RUN yarn global add sequelize

EXPOSE 3000

CMD ['yarn','start']

