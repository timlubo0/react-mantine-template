import { useMutation } from "@tanstack/react-query";
import { LoginResponse, authService } from "../services/auth";
import { ILogin } from "../types";

export const useAuth = () => {
    const session = sessionStorage.getItem('access_token');
    const isLoggedIn = session === null ? false : true;

    return{
        isLoggedIn: isLoggedIn,
        user: JSON.parse(sessionStorage.getItem('user') || '{}'),
        accessToken: sessionStorage.getItem('access_token'),
        logout: () => {
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("user");
        }
    }
}

export const useLogin = ({ onSuccess, onError }: {
  onSuccess?: (response?: LoginResponse) => void;
  onError?: (error?: LoginResponse | unknown) => void;
}) => {
    const loginMutation = useMutation({
        mutationFn: (credentials: ILogin) => authService.login(credentials),
        onSuccess: (response) => {
            onSuccess?.(response);
        },
        onError: (error) => {
            onError?.(error);
        },
    });
  
    return loginMutation;
};