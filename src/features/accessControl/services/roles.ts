import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IRole } from "../types";

export const rolesService = {
  create: (payLoad: IRole): Promise<PostPutResponse<IRole>> =>
    api.post({ endPoint: endPoints.roles, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.roles, params: params }),
  update: (payLoad: IRole, uid: string): Promise<PostPutResponse<IRole>> =>
    api.post({ endPoint: `${endPoints.roles}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IRole>> =>
    api.get({ endPoint: `${endPoints.roles}/${uid}`, method: "DELETE" }),
};