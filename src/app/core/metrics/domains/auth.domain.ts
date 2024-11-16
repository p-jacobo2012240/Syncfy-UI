import { AuthClaim } from "./auth-claims.domain";

/** Deprecated  */
export class AuthDomain {
    id: Number = 0;
    email: string = '';
    aud: string = '';
    iss: string = '';
    nonce: string ='';
    picture: string = '';
}

/** Deprecated */
export interface AuthDtoPayloadDomain {
    email?: string;
}


export interface UserInfo extends AuthClaim {
    auth_id?: string;
    createdAt?: Date;            
    updatedAt?: Date;            
    isActive?: boolean;          
    customUserData?: any;
}


