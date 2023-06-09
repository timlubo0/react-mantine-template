import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { IPermission } from "../types";
import { IMutationProps } from "../../types";
import { permissionsService } from "../services/permissions";
import { useAuth } from "../../auth/hooks/auth";

export const usePermissions = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.permissions, params], 
      queryFn: () => permissionsService.findAll(params),
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: true
    },
  );

  return {
    data: data?.data || [],
    meta: data?.meta || {},
    errorResponse: data?.meta == undefined && !rest.isLoading,
    ...rest
  };
};

export const usePermission = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.permissions}${uid}`], 
      queryFn: () => permissionsService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useFeaturePermissions = () => {
  const { user } = useAuth();
  const permissionChecker = (route: string) => {

    const permission = user?.role?.permissions?.find((permission) => permission.feature.url === route);

    return permission;

  }
  return permissionChecker;
}

export const usePermissionsMutation = ({
  onSuccess,
  onError,
  uid
}: IMutationProps<IPermission> & {uid: string}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any[]) => permissionsService.create(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries([`${endPoints.roles}${uid}`]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};