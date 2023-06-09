import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { citiesService } from "../services/cities";
import { ICity } from "../types";
import { IMutationProps } from "../../types";

export const useCities = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.cities, params], 
      queryFn: () => citiesService.findAll(params),
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

export const useCity = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.cities}${uid}`], 
      queryFn: () => citiesService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useCitiesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<ICity>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: ICity) =>
        model ? citiesService.update(payload, `${model.uid}`) : citiesService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.cities]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};

export const useCityDelete = ({
    onSuccess,
    onError
  }: IMutationProps<ICity>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => citiesService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.cities]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
