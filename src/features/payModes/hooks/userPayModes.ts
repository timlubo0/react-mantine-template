import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { IUSerPayMode } from "../types";
import { IMutationProps } from "../../types";
import { userPayModesService } from "../services/userPayModes";

export const useUserPayModes = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.userPayModes, params], 
      queryFn: () => userPayModesService.findAll(params),
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

export const useUserPayMode = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.userPayModes}${uid}`], 
      queryFn: () => userPayModesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useUserPayModesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IUSerPayMode>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IUSerPayMode) =>
        model ? userPayModesService.update(payload, `${model.uid}`) : userPayModesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.userPayModes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useUserPayModeDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IUSerPayMode>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => userPayModesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.userPayModes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
