export interface ErrorCodes {
    code: string|number;
    message: string;
    errors:[
        {message:string}
    ]
}
export interface iSignUp {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role?: string;
    address?: string;
}
export interface iProfile {
    email: string;
    name: string;
    phone?: string;
    address?: string;
    role: string;
}