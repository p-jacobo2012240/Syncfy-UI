import {AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
    issuer: environment.keycloack.authConfiguration.issuer,
    redirectUri: environment.keycloack.authConfiguration.directUri,
    clientId: environment.keycloack.authConfiguration.clientId,
    responseType: environment.keycloack.authConfiguration.responseType,
    strictDiscoveryDocumentValidation: environment.keycloack.authConfiguration.strictDiscoveryDocumentValidation,
    scope: environment.keycloack.authConfiguration.scope,
    requireHttps: environment.keycloack.authConfiguration.requireHttps
}