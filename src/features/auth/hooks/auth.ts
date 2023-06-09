import { useMutation } from "@tanstack/react-query";
import { LoginResponse, authService } from "../services/auth";
import { ILogin, IUser } from "../types";
import  secureLocalStorage  from  "react-secure-storage";

export const useAuth = () => {
    const session = sessionStorage.getItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`);
    const isLoggedIn = session === null ? false : true;

    return{
        isLoggedIn: isLoggedIn,
        user: <IUser>secureLocalStorage.getItem(`${process.env.REACT_APP_SESSION_USER}`),
        accessToken: sessionStorage.getItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`),
        logout: () => {
            sessionStorage.removeItem(`${process.env.REACT_APP_ACCESS_TOKEN_NAME}`);
            secureLocalStorage.removeItem(`${process.env.REACT_APP_SESSION_USER}`);
        }
    }
}

export const useLogin = ({ onSuccess, onError }: {
  onSuccess?: (response: LoginResponse) => void;
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

export const useResetPasswordOtp = ({ onSuccess, onError }: {
  onSuccess?: (response: { status: boolean }) => void;
  onError?: (error?: unknown) => void;
}) => {
    const loginMutation = useMutation({
        mutationFn: (credentials: IUser) => authService.resetPasswordOtp(credentials),
        onSuccess: (response) => {
            onSuccess?.(response);
        },
        onError: (error) => {
            onError?.(error);
        },
    });
  
    return loginMutation;
};