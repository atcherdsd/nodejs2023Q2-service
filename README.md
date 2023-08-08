# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:atcherdsd/nodejs2023Q2-service.git

or 

git clone https://github.com/atcherdsd/nodejs2023Q2-service.git
```

## Change directory

```
cd nodejs2023Q2-service
```

## Switch branch

```
git checkout rest2-docker-db
```

## Installing NPM modules

```
npm install
```

## Rename the `.env.example` file to `.env`

## Running application

```
docker-compose up -d
```
## Info about application

After starting the app, to view information 
about running containers, run the command in the terminal:

```
docker-compose ps
```

To view size information about the Docker application image 
and database image, run the following command in a terminal:

```
docker-compose images
```

To stop and remove containers, run the command in the terminal:

```
docker-compose down
```

## Deploy on Docker Hub

The built application images are hosted on Docker Hub:

https://hub.docker.com/repository/docker/atcherdsd/nodejs2023q2-service-app/general

(`latest` tag for the application and `postgres` tag for the database).

## Application Documentation

On port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
