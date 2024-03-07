// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const browserWindow = window || {};
const browserWindowEnv = browserWindow['__env'] || {};

const CRYPTO: string = browserWindowEnv['CRYPTO'] || '';

export const environment = {
  production: false,
  CRYPTO: `${CRYPTO}`,
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5ulearn',
  // chay tren local
   apiUrlServer: 'http://localhost:8084/api/v1/',

  //chay tren server
  //apiUrlServer: 'https://blogs-f0g2.onrender.com/api/v1/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
