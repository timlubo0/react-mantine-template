import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { rolesService } from "../services/roles";
import { IRole } from "../types";
import { IMutationProps } from "../../types";

export const useRoles = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.roles, params], 
      queryFn: () => rolesService.findAll(params),
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

export const useRole = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.roles}${uid}`], 
      queryFn: () => rolesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useRolesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IRole>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IRole) =>
        model ? rolesService.update(payload, `${model.uid}`) : rolesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.roles]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useRoleDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IRole>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => rolesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.roles]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
