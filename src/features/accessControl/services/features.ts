import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { IPaginationQueryParams, IQueryResults, PostPutResponse } from "../../../api/types";
import { IFeature } from "../types";

export const featuresService = {
  create: (payLoad: IFeature): Promise<PostPutResponse<IFeature>> =>
    api.post({ endPoint: endPoints.features, data: payLoad }),
  findAll: (params?: IPaginationQueryParams): Promise<IQueryResults | any> =>
    api.get({ endPoint: endPoints.features, params: params }),
  find: (uid: string): Promise<IFeature> =>
    api.get({ endPoint: `${endPoints.features}/${uid}` }),
  update: (payLoad: IFeature, uid: string): Promise<PostPutResponse<IFeature>> =>
    api.post({ endPoint: `${endPoints.features}/${uid}`, data: payLoad, method: "PUT" }),
  delete: (uid: string): Promise<PostPutResponse<IFeature>> =>
    api.get({ endPoint: `${endPoints.features}/${uid}`, method: "DELETE" }),
};