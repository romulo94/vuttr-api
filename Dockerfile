FROM node:10-alpine

WORKDIR  /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn global add nodemon
RUN yarn global add sucrase
RUN yarn global add sequelize-cli
RUN yarn global add sequelize

EXPOSE 3000

CMD ['yarn','start']

