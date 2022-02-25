Twitter api

This repo contains two modules:

- server: For server side code
- client: For client side code

#### Prerequisites

1. Docker
1. [nvm](https://github.com/nvm-sh/nvm) or node(v16.13.0) installed

#### Steps to run

1. To start up mysql
   ```
   docker compose up -d
   ```
2. To start up server on port 5000
   ```
   cd server
   npm i
   npm run dev
   ```
3. To start up frontend on port 3000
   ```
   npm i
   npm run start
   ```
