import { IUser } from "../auth/types";

export interface IPayMode{
    id?: string;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
}

export interface IUSerPayMode{
    id?: string;
    uid?: string;
    userId: string;
    payModeId: string;
    number: string;
    user?: IUser;
    pay_mode?: IPayMode;
}