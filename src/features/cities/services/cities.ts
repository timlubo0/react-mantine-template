import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { ICity } from "../types";

export const citiesService = {
  create: (payLoad: ICity): Promise<PostPutResponse<ICity>> =>
    api.post({ endPoint: endPoints.cities, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.cities, params: params }),
  find: (uid: string): Promise<ICity> =>
    api.get({ endPoint: `${endPoints.cities}/${uid}` }),
  update: (payLoad: ICity, uid: string): Promise<PostPutResponse<ICity>> =>
    api.post({ endPoint: `${endPoints.cities}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<ICity>> =>
    api.get({ endPoint: `${endPoints.cities}/${uid}`, method: "DELETE" }),
};