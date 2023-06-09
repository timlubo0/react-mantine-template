import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IUser } from "../types";

export const usersService = {
  create: (payLoad: IUser): Promise<PostPutResponse<IUser>> =>
    api.post({ endPoint: endPoints.users, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.users, params: params }),
  find: (uid: string): Promise<IUser> =>
    api.get({ endPoint: `${endPoints.users}/${uid}` }),
  update: (payLoad: IUser, uid: string): Promise<PostPutResponse<IUser>> =>
    api.post({ endPoint: `${endPoints.users}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IUser>> =>
    api.get({ endPoint: `${endPoints.users}/${uid}`, method: "DELETE" }),
};