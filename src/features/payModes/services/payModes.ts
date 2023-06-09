import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IPayMode } from "../types";

export const payModesService = {
  create: (payLoad: IPayMode): Promise<PostPutResponse<IPayMode>> =>
    api.post({ endPoint: endPoints.payModes, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.payModes, params: params }),
  find: (uid: string): Promise<IPayMode> =>
    api.get({ endPoint: `${endPoints.payModes}/${uid}` }),
  update: (payLoad: IPayMode, uid: string): Promise<PostPutResponse<IPayMode>> =>
    api.post({ endPoint: `${endPoints.payModes}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IPayMode>> =>
    api.get({ endPoint: `${endPoints.payModes}/${uid}`, method: "DELETE" }),
};