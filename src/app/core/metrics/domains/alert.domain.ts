import { AuthDomain } from "./auth.domain";

export interface AlertDomain {
    id: Number;
    name: string;
    creationDate: Date;
    expiryDate: Date,
    type: string;
    isValidForFilter: boolean;
    auth: AuthDomain
}