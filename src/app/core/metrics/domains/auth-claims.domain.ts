export interface AuthClaim {
    acr?: string;
    at_hash?: string;
    aud?: string;
    auth_time?: number;
    azp?: string;
    email?: string;
    email_verified?: boolean;
    exp?: number;
    family_name?: string;
    given_name?: string;
    iat?: number;
    iss?: string;
    jti?: string;
    name?: string;
    nonce?: string;
    preferred_username?: string;
    sid?: string;
    sub?: string;
    typ?: string;
    roles?: string[];
}