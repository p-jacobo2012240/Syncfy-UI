export interface AuthDomain {
    id?: Number;
    email?: string;
    aud?: string;
    iss?: string;
    nonce?: string;
    picture?: string;
}

export interface AuthDtoPayloadDomain {
    email?: string;
}