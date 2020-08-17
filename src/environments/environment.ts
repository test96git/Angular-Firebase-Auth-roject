// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const FB_PROJECT_ID = 'angular-firebase-auth-b1fe3';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBk5ZuTYVO1qmnQi-mUJBlkWq85FCoVmG0',
    authDomain: `${FB_PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${FB_PROJECT_ID}.firebaseio.com`,
    projectId: FB_PROJECT_ID,
    storageBucket: `${FB_PROJECT_ID}.appspot.com`,
    messagingSenderId: '837153752014'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
