## About the Syncfy-UI

Syncfy was born as a tracking measure for a large volume of documents. Normally we have ftp servers that upload the files from the initial origin to the cloud, but syncfy provides a set of tools for file tracking, scalability infrastructure, observers for configured alerts and different channels to manage files in AWS S3 and spaces in Digital Ocean in one place.

## Features

- Cloud Native infrastructure
- CQRS pattern for handling of events
- Administration in one place by start to end
- Extensive features of legacy ftp system files

## How it works

![Syncfy Base Diagram](https://raw.githubusercontent.com/p-jacobo2012240/Syncfy-UI/feature/keycloack-migration/src/assets/diagrams/syncfy-base-diagram.png)

## Components

Below its describe the three components of the core. that work since the auth till the handle of keys of  buckets or storages in the clouds previously mentioned.

| Component | Repository |
| ------ | -------- |
| Agent | https://github.com/p-jacobo2012240/Syncfy-UI |
| Kafka  | https://github.com/p-jacobo2012240/syncfy-management
| Real time engine | https://github.com/p-jacobo2012240/Syncfy-engine-realtime |

# Tech aspects

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.