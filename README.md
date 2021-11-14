[![CircleCI](https://circleci.com/gh/avniproject/avni-canned-reports/tree/main.svg?style=svg)](https://circleci.com/gh/avniproject/avni-canned-reports/tree/main)


## avni-canned-reports
This project provides default analytics for organisations that run Avni. It is integrated to the main web application of Avni - avni-webapp. While this can be run standalone against a dev-mode server, or a production server if you can generate a JWT-token and pass it in the url with the parameter "authToken", the primary purpose is to keep it integrated to the Avni web console. 


### Development

To start the app, run  `yarn start`. 
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Configuration
The app requires a working avni-server instance. The default is set in package.json to a local instance.\
 To run in dev mode, change the value in package.json. 
 
If you want to run as a specific user, run the app with the parameter REACT_APP_DEV_ENV_USER
eg: 
```javascript
REACT_APP_DEV_ENV_USER=user@org yarn start
```

Setting up the app this way will allow avni-server running in development mode to recognise the user.

### Production
This app is expected to be run as part of [avni-webapp](https://github.com/avniproject/avni-webapp/). It is installed as an npm package there and integrated into the Avni ecosystem. Many facilities such as the login page etc, are part of avni-webapp. 

### Release
Publish as npm module. 
```shell script
make release
make publish
```
