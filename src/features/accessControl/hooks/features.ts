import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { IFeature, IRole } from "../types";
import { IMutationProps } from "../../types";
import { featuresService } from "../services/features";

export const useFeatures = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.features, params], 
      queryFn: () => featuresService.findAll(params),
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

export const useFeature = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.features}${uid}`], 
      queryFn: () => featuresService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useFeaturesMutation = ({
    onSuccess,
    onError,
    model
  }: IMutationProps<IFeature>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (payload: IFeature) =>
        model ? featuresService.update(payload, `${model.uid}`) : featuresService.create(payload),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.features]);
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
  }: IMutationProps<IFeature>) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (uid: string) => featuresService.delete(uid),
      onSuccess: (response) => {
        queryClient.invalidateQueries([endPoints.features]);
        onSuccess?.(response);
      },
      onError: (errors) => {
        onError?.(errors);
      },
    });
};
