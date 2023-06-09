import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { currenciesService } from "../services/currencies";
import { ICurrency } from "../types";
import { IMutationProps } from "../../types";

export const useCurrencies = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.currencies, params], 
      queryFn: () => currenciesService.findAll(params),
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

export const useCurrency = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.currencies}${uid}`], 
      queryFn: () => currenciesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useCurrenciesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<ICurrency>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: ICurrency) =>
        model ? currenciesService.update(payload, `${model.uid}`) : currenciesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.currencies]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useCurrencyDelete = ({
    onSuccess,
    onError
  }: IMutationProps<ICurrency>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => currenciesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.currencies]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
