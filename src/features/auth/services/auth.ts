import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { ILogin } from "../types";

export type LoginResponse = {
  status?: boolean;
  user?: string;
  access_token?: string;
  message?: string;
}

export const authService = {
  login: (credentials: ILogin): Promise<LoginResponse> =>
    api.post({ endPoint: endPoints.login, data: credentials }),
};