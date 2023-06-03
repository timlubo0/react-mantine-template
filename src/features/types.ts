import { PostPutResponse } from "../api/types";

export interface IMutationProps<T>{
    onSuccess?: (response: PostPutResponse<T>) => void;
    onError?: (error: unknown) => void;
    model?: T;
}