NODE_ENV=test npx sequelize db:create
NODE_ENV=test npx sequelize db:migrate
NODE_ENV=test jest --verbose --runInBand --detectOpenHandles --coverage
NODE_ENV=test npx sequelize db:migrate:undo:all
NODE_ENV=test npx sequelize db:drop
