import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPaginationQueryParams, PostPutResponse } from "../../../api/types";
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

export const useUsersMutation = ({
  onSuccess,
  onError,
}: IMutationProps<IUser>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUser) => usersService.create(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries([endPoints.users]);
      onSuccess?.(response);
    },
    onError: (errors) => {
      onError?.(errors);
    },
  });
};
  
