import { IRole } from "../accessControl/types";

export interface IUser{
    id?: string;
    uid?: string;
    name: string;
    email: string;
    phone: string;
    roleId: string;
    role?: IRole;
    password?: string;
}

export interface ILogin{
    username: string;
    email?: string;
    password: string;
}
