import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IPermission } from "../types";

export const permissionsService = {
  create: (payLoad: any[]): Promise<PostPutResponse<IPermission>> =>
    api.post({ endPoint: endPoints.permissions, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.permissions, params: params }),
  find: (uid: string): Promise<IPermission> =>
    api.get({ endPoint: `${endPoints.permissions}/${uid}` }),
};