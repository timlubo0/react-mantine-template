export interface IPaginationQueryParams{
    page: number;
    per_page: number;
}

export interface IQueryResults{
    meta: {
        current_page: number;
        first_page: number;
        first_page_url: string;
        last_page: number;
        last_page_url: string;
        next_page_url?: string;
        per_page: number;
        previous_page_url?: string;
        total: number;
    },
    data: Array<any>;
}

export interface PostPutResponse<T>{
    status: boolean;
    data?: T;
}