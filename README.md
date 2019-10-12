# VUTTR (Very Useful Tools to Remember)

[![Coverage Status](https://coveralls.io/repos/github/romulo94/vuttr-api/badge.svg?branch=develop)](https://coveralls.io/github/romulo94/vuttr-api?branch=develop)

[![Build Status](https://travis-ci.org/romulo94/vuttr-api.svg?branch=develop)](https://travis-ci.org/romulo94/vuttr-api)

---

**API developed with NodeJS(expressjs) and Sequelize.**

The application is a simple repository for managing tools with their names, links, descriptions and tags.

## Test API:

[see the api](http://ec2-18-206-151-22.compute-1.amazonaws.com/)

## See the documentation

[Swagger api vuttr](https://app.swaggerhub.com/apis/romulo94/vuttr/1.0.0)

## Install Docker e Docker-compose

- **Docker** _[Documentation](https://docs.docker.com/install/linux/docker-ee/ubuntu/) and download._

- **Compose** _[Documentation](https://docs.docker.com/compose/install/) and download._

- Utils
  - Init the containers in _detached mode_ (background mode) `docker-compose up -d`
  - Stop all containers `docker stop $(docker ps -a -q)`
  - Delete all containers `docker rm $(docker ps -a -q)`

## Using Docker

- Configure your file `.env` (see the example in `.env.example`):
- Put the same value in your `.env` to database (DB) and docker (POSTGRES)
- Set **DB_HOST=postgres** and
- Start your docker compose:

  ```
  docker-compose up
  ```

  **If you're not in _detached mode_ don't close youe terminal**
  **OBS: Sometimes you need to use `sudo` in all commands**

  **CTRL + C** stop running.

- If you need to rebuild the containers:

  ```
  docker-compose up --build
  ```

## How to run (without Docker-compose)

**Really? Please, use docker-compose**

- Configure your file `.env` (see the example in `.env.example`):
- Set **DB_HOST=localhost** or to your remote database
- Run your DB
- Pay attention: When you run `npm run dev` or `yarn dev` your migrations gonna run too.

with `npm`

```console(javascript)
    npm install
    npm run dev
```

or

```console(javascript)
    yanr
    yarn dev
```

### How to test

**Você precisa ter um banco rodando localmente. Não esqueça de configurar o seu arquivo .env e o env.test**

with `npm`

```console(javascript)
    npm install
    npm run test
```

or

```console(javascript)
    yanr
    yarn test
```

### Libraries

##### Dependencies

- express
- express-async-errors
- bcryptjs
- jsonwebtoken
- sequelize
- pg
- youch
- cors
- dotenv
- @sentry/node
- @sucrase/jest-plugin

##### DevDependencies

- nodemon
- sucrase
- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier
- jest
- @types/jest
- factory-girl
- faker
- prettier
- sequelize-cli
- sqlite3
- supertest

### Configure your eslint

- Please add in your extensions `eslint` and `prettier`
- In settings.json ( See VsCode ) put : `"editor.formatOnSave: true"` and `"prettier.esLintIntegration": true`

##### Any question or bug:

Open an issue, please.
