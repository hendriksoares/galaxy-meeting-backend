# Galaxy Meeting 

This is Nest.js project backend API Galaxy Meeting. 

This project is a galaxy of conferences where the traveler can navigate between galaxies and planets to interact through videoconference.

## Install Dependencies

```bash
npm install
# or
yarn
```

## Configure a mock data (docker)

This project has a docker-compose to up a POSTGRE database. It was configured to run with .env variables.
```bash
docker-compose up postgres -d
```
Also have a mock data prepared with migrations files.
```bash
yarn typeorm migration:run
```
## Getting Started

First, run the development server:

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy 

```bash
npm run build
npm run build
# or
yarn build
yarn start:prod
```

