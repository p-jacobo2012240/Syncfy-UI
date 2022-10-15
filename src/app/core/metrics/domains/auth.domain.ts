export class AuthDomain {
    id: Number = 0;
    email: string = '';
    aud: string = '';
    iss: string = '';
    nonce: string ='';
    picture: string = '';
}

export interface AuthDtoPayloadDomain {
    email?: string;
}