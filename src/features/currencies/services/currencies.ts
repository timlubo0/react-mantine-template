import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { ICurrency } from "../types";

export const currenciesService = {
  create: (payLoad: ICurrency): Promise<PostPutResponse<ICurrency>> =>
    api.post({ endPoint: endPoints.currencies, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.currencies, params: params }),
  find: (uid: string): Promise<ICurrency> =>
    api.get({ endPoint: `${endPoints.currencies}/${uid}` }),
  update: (payLoad: ICurrency, uid: string): Promise<PostPutResponse<ICurrency>> =>
    api.post({ endPoint: `${endPoints.currencies}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<ICurrency>> =>
    api.get({ endPoint: `${endPoints.currencies}/${uid}`, method: "DELETE" }),
};