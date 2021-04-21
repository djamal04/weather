# Weather

Application to display weather forecast.

API call has been mocked with files `assets/cities.json` and `assets/forecast.json`.

'Display weather icon' has not been done.

Personal Google map API key has been used.

## Prerequisites
node and npm installed.

Google chrome is recommanded

Optional Docker to build images and  deploy them.

## Launch the application

First, clone the repo, do to the directory weather (containing package.json) and launch the command `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build on docker

Run `docker build -t weather .` to build a new image based nginx with compiled HTML and JS files.

## Run with docker

Once build with docker finished, run `docker run -p 80:80 weather` Navigate to `http://localhost/`

## Build without docker

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build on docker-compose

Replace Dockerfile file content by Dockerfile-compose and run ` docker-compose up -d --build` and `docker-compose run --service-ports weather-service`

