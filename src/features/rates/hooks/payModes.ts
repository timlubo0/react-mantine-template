import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { ratesService } from "../services/rates";
import { IRate } from "../types";
import { IMutationProps } from "../../types";

export const useRates = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.rates, params], 
      queryFn: () => ratesService.findAll(params),
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

export const useRate = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.rates}${uid}`], 
      queryFn: () => ratesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useRatesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IRate>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IRate) =>
        model ? ratesService.update(payload, `${model.uid}`) : ratesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.rates]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useRateDelete = ({
    onSuccess,
    onError
  }: IMutationProps<IRate>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => ratesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.rates]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
