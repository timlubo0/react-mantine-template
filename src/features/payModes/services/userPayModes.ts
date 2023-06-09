import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IUSerPayMode } from "../types";

export const userPayModesService = {
  create: (payLoad: IUSerPayMode): Promise<PostPutResponse<IUSerPayMode>> =>
    api.post({ endPoint: endPoints.userPayModes, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.userPayModes, params: params }),
  find: (uid: string): Promise<IUSerPayMode> =>
    api.get({ endPoint: `${endPoints.userPayModes}/${uid}` }),
  update: (payLoad: IUSerPayMode, uid: string): Promise<PostPutResponse<IUSerPayMode>> =>
    api.post({ endPoint: `${endPoints.userPayModes}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IUSerPayMode>> =>
    api.get({ endPoint: `${endPoints.userPayModes}/${uid}`, method: "DELETE" }),
};