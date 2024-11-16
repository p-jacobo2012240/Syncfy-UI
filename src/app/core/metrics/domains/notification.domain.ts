import { AuthClaim } from "./auth-claims.domain";

export interface NotificationDomain {
    id: Number;
    name: string;
    creationDate: Date;
    expiryDate: Date,
    type: string;
    isValidForFilter: boolean;
    auth: AuthClaim;
}