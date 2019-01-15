// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAmbTkbemnBchdpvV5PvT0qHvlfhM5wKbU',
    authDomain: 'myqrapp-fdb3b.firebaseapp.com',
    databaseURL: 'https://myqrapp-fdb3b.firebaseio.com',
    projectId: 'myqrapp-fdb3b',
    storageBucket: 'myqrapp-fdb3b.appspot.com',
    messagingSenderId: '415399973733'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
