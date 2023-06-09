import { ICurrency } from "../currencies/types";

export interface IRate{
    id?: string;
    uid?: string;
    currencyId: string;
    currencyToId: string;
    currency?: ICurrency;
    currencyTo?: ICurrency;
    amount: number;
}