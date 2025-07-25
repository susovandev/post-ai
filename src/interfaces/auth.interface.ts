export interface ICreateUserPayload {
    username: string;
    email: string;
    password: string;
}

export interface ILoginUserPayload {
    username?: string;
    email?: string;
    password: string;
}
