[![CircleCI](https://circleci.com/gh/avniproject/avni-canned-reports/tree/main.svg?style=svg)](https://circleci.com/gh/avniproject/avni-canned-reports/tree/main)


## avni-canned-reports
This project provides default analytics for organisations that run Avni. It is integrated to the main web application of Avni - avni-webapp.

![Avni canned repo](https://user-images.githubusercontent.com/426156/141683178-de08f749-1f26-4998-9a92-1fcb88403533.png)

## Context
Avni is an open source field service delivery and data collection platform for non-profits and governments in all sectors — health, water, education, social service

[Website](https://avniproject.org/) • [Getting Started](https://avniproject.org/getting-started/) • [Docs](https://avni.readme.io/docs) • [Case studies](https://avniproject.org/case-studies) • [Blog](https://avniproject.org/blog) • [Gitter](https://gitter.im/avniproject/avni)  • [Twitter](https://twitter.com/avniproject)

## Why Avni-canned-reports
Analytics from data captured via Avni can be derived by connecting any BI tool e.g. Metabase to either Avni database or APIs. However, this has certain limitations 
Setting up analytics using these BI tool requirers the know-how of these tools. Many organisations using Avni don't have these expertise and they need to depend upon software partners to set this up for them. This has time and cost implications. 

So introducing Avni canned reports where it understands the domain and smartly gives out-of the box insights which can be a good starter for organisations to start reviewing and making sense of their data without any extra cost. It also gives ability to explore data based on dimensions and pre-defined filters required in the domain.

## Current State and Roadmap
We currently plan to introduce some out of the box dashboards

1. Activities - To give an overview of work done by Avni's data model, that is Registration, Enrolments, Exits, Visits, Visits done on time and Visits cancelled. [Completed]
2. Data - To give overall distribution of data captured across form submissions e.g. Distribution by Occuptation, Distribution by Gender. [Completed]
3. HR - To give a picture of usage of the app from users lens. [To be done soon]

We will continue to review the uptake of this and introduce more features like ability to mention derived measures and create custom dashboards.

## Development

To start the app, run  `yarn start`. 
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Configuration
The app requires a working avni-server instance. The default is set in package.json to a local instance.\
 To run in dev mode, change the value in package.json. 
 
If you want to run as a specific user, run the app with the parameter REACT_APP_DEV_ENV_USER
eg: 
```javascript
REACT_APP_DEV_ENV_USER=user@org yarn start
```

Setting up the app this way will allow avni-server running in development mode to recognise the user. 

If running against an existing avni server that has authentication setup, 
- Ensure package.json points to the right server
- Open the app with a valid id token. eg: http://localhost:3000?authToken=...

### Production
This app is expected to be run as part of [avni-webapp](https://github.com/avniproject/avni-webapp/). It is installed as directory right beside the current avni-webapp. Many facilities such as the login page etc, are part of avni-webapp. 


### Using Docker
There's docker-compose file included in the root directory. To run it on local simple checkout the project and run `docker-compose up` to run server and db containers.Use `docker-compose down` to destroy the containers. Web app can be accessed at http://localhost:8021
The docker images includes the db, server, webapp and avni-canned-analytics webapp. The webapp has admin, app designer and data entry app to be able to configure the app, enter tranactional data and then review the analytics.
