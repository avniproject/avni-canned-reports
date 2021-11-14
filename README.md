## Available Scripts

In the project directory, you can run:

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
This app is expected to be run in  

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
