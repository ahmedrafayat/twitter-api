# Twitter api

This repo contains two modules:

- server: For server side code
- client: For client side code (not implemented yet)

#### Prerequisites

Please ensure you have the following installed

1. [Docker](https://www.docker.com/products/docker-app)
1. [nvm](https://github.com/nvm-sh/nvm) or [node](https://nodejs.org/en/download/)(v16.x.x preferably) installed

#### Steps to run

For development build

1. To start up mysql
   ```
   ./scripts/dev/start.dev.sh
   ```
1. Install dependencies
   ```
   cd server
   npm i
   ```
1. To seed database with users (Optional)

   ```
   cd server
   npm run seed:run
   ```

1. To start up server on port 5000
   ```
   cd server
   npm run dev
   ```
1. To stop mysql
   ```
   ./scripts/dev/stop.dev.sh
   ```

For running tests

1. To start up mysql
   ```
   ./scripts/test/start.test.sh
   ```
1. Install dependencies
   ```
   cd server
   npm i
   ```
1. To start up server on port 5000
   ```
   cd server
   npm run test
   ```
1. To stop mysql
   ```
   ./scripts/test/stop.test.sh
   ```
