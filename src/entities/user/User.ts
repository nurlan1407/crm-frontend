export interface User{
    id?:number;
    email:string;
}

export interface UserFormData {
    email:string;
    password:string
}

export interface LoginFormParams{
    email:string;
    password:string
}
export interface LoginResponse{
    accessToken:string;
    msg?:string
}