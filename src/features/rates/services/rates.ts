import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IRate } from "../types";

export const ratesService = {
  create: (payLoad: IRate): Promise<PostPutResponse<IRate>> =>
    api.post({ endPoint: endPoints.rates, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.rates, params: params }),
  find: (uid: string): Promise<IRate> =>
    api.get({ endPoint: `${endPoints.rates}/${uid}` }),
  update: (payLoad: IRate, uid: string): Promise<PostPutResponse<IRate>> =>
    api.post({ endPoint: `${endPoints.rates}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IRate>> =>
    api.get({ endPoint: `${endPoints.rates}/${uid}`, method: "DELETE" }),
};