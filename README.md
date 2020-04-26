# Ergo-One

## Description

The purpose of the tool we are developing is explained in [Objectives](doc/objectives.md).

Currently, a live demo is running here: http://ergo-one-dev-webclientbucket-ionyhjid8p2l.s3-website.eu-central-1.amazonaws.com

## Development

### Prerequisites

- Python and Pip
- NodeJS and Yarn
- an account on AWS
- credentials for AWS named "ergo-one-developer" in your _\$HOME/.aws/credentials_ file.

#### Setup

Now you should run:

- `yarn install-python-requirements` to install the python packages needed to run the AWS CLI
- `yarn install` to install nodejs dependencies for the backend
- `cd web-client && yarn install` to install nodejs dependencies for the frontend

#### IDE Setup

This project uses [Prettier](https://prettier.io/) to enforce a uniform coding style. Every developer should set up
their set up their IDE/editor of choice to automatically format code using Prettier whenever a file is saved.

On WebStorm, the following scope is used:
`(file:*.ts||file:*.js||file:*.json||file:*.css||file:*.scss||file:*.vue||file:*.html||file:*.md||file:*.yml||file:*.yaml)&&!(file:*/coverage//*||file:*/dist//*)`

More instructions can be found on the following page: https://prettier.io/docs/en/editors.html.

### Create the S3 Bucket used by SAM CLI to deploy

```sh
yarn create-sam-bucket
```

### Deploy a personal stack

#### Backend

In order to deploy your own backend stack on AWS, use the following command:

```sh
yarn build-and-deploy:backend:dev
```

The outputs displayed at the end of the deployment indicate the URLs of both:

- the API Gateway that serves the backend API
- the S3 Bucket that serves the web client (read on for instructions to populate the bucket)

#### Frontend

In order to deploy the frontend to the S3 Bucket created in the step above, use the following command:

```sh
yarn build-and-deploy:frontend:dev
```

You can now access the frontend from http://localhost:8080.

### Local deployment

#### Backend

In order to run the backend locally, use the following command:

```sh
yarn build-and-deploy:backend:local
```

You can now access the backend on http://localhost:3000.

**Note:** Only the API Gateway and the Lambdas are deployed locally. The rest of the infrastructure, including DynamoDB,
must still be deployed on AWS for the application to work.

#### Frontend

In order to run the frontend locally, use the following command:

```sh
yarn build-and-deploy:frontend:local
```

You can now access the frontend from http://localhost:8080.

## Useful links

- [Offline Storage for Progressive Web Apps](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [marked-forms](https://github.com/jldec/marked-forms)
- [marksup](https://github.com/bosky101/marksup)
- [wmd fork](https://github.com/brikis98/wmd)
