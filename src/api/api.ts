import axios from 'axios';

export interface ApiProps{
    endPoint: string;
    params?: any;
    authorization?: string;
    method?: string;
    contentType?: string;
}

export type ApiPostProps = ApiProps & { data: any }; 

export const api = {
    get: async ({
        endPoint,
        params,
        authorization = sessionStorage.getItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`) || "",
        method = 'GET'
    }: ApiProps) => {
        try {
        const request = {
            url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
            method: method,
            headers: {
            Authorization: `Bearer ${authorization}`,
            Accept: "application/json",
            },
            params: params,
        };

        const response = await axios(request);

        return response.data;
        } catch (error) {
            return error;
        }
    },
    post: async ({
        endPoint,
        data,
        authorization = sessionStorage.getItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`) || "",
        method = 'POST',
        contentType = "application/json",
    }: ApiPostProps) => {
        try {
        const request: Object = {
            url: `${process.env.REACT_APP_API_URL}/${endPoint}`,
            method: method,
            headers: {
            Authorization: `Bearer ${authorization}`,
            "Content-Type": contentType,
            Accept: "application/json",
            },
            data: data,
        };

        const response: any = await axios(request);

        return response.data;
        } catch (error) {
        return error;
        }
    },
};