import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams } from "../../../api/types";
import { endPoints } from "../../../api/endPoints";
import { usersService } from "../services/users";
import { IUser } from "../types";
import { IMutationProps } from "../../types";

export const useUsers = (params?: IPaginationQueryParams) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [endPoints.users, params], 
      queryFn: () => usersService.findAll(params),
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


export const useUser = (uid: string) => {
  const { data, ...rest } = useQuery(
    {
      queryKey: [`${endPoints.users}${uid}`], 
      queryFn: () => usersService.find(uid),
    },
  );

  return {
    data: data,
    errorResponse: data?.id == undefined && !rest.isLoading,
    ...rest
  };
};

export const useUsersMutation = ({
  onSuccess,
  onError,
  model
}: IMutationProps<IUser>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUser) =>
      model
        ? usersService.update(payload, `${model.uid}`)
        : usersService.create(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.users]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};

export const useUserDelete = ({
  onSuccess,
  onError
}: IMutationProps<IUser>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uid: string) => usersService.delete(uid),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.users]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};
  
