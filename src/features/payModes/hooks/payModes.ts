import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { payModesService } from "../services/payModes";
import { IPayMode } from "../types";
import { IMutationProps } from "../../types";

export const usePayModes = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.payModes, params], 
      queryFn: () => payModesService.findAll(params),
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

export const usePayMode = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.payModes}${uid}`], 
      queryFn: () => payModesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const usePayModesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IPayMode>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IPayMode) =>
        model ? payModesService.update(payload, `${model.uid}`) : payModesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.payModes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const usePayModeDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IPayMode>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => payModesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.payModes]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
