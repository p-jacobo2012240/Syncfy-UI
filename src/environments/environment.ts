// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  keycloack: {
    allowedUrl: 'http://localhost:8081/auth',
    authConfiguration: {
      issuer: 'http://localhost:8080/realms/oauth2-syncfy-realm',
      directUri: window.location.origin + '/login-callback',
      clientId: 'syncfy-id',
      responseType: 'code',
      strictDiscoveryDocumentValidation: false,
      scope: 'openid profile email offline_access',
      requireHttps: false
    }
  },
  syncfyManagement: {
    apiURL: 'http://localhost',
    port: '8081'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
