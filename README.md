Update your .env file 

Node version is `v18.13.0`

1. `npm i` -  for server and client 
2. change .env file for connection to DB
3. server port  `npm run start:dev` : http://localhost:8081/
4. server documentation: http://localhost:8081/swagger
5. client port  `npm run start` : http://localhost:3000


########### Migrations and Seeds ###############
1. `npm run db:schema:create` - create DB schema 
2. `npm run migration:run:latest` - run migrations to initialize entities in DB
3. `npm run seed:run` - to fill existing tables in DB

########### e2e tests locally ###############
1. Download Rancher or Docker Desktop 
2. Start Docker service locally
3. `npm run test:e2e` - test container will up and create test database base with migrations and seeds after that we will be able to run existing e2e tests locally.
 
