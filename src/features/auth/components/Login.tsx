import React from "react";
import { Title, Text } from "@mantine/core";
import LoginForm from "./forms/LoginForm";
import { ILogin } from "../types";
import { useLogin } from "../hooks/auth";
import { toast } from "../../../utils/toast";
import { loginStyles } from "../styles/loginStyles";

function Login(){

    const login = useLogin({
        onSuccess: (response) => {
            if (response?.access_token) {

                sessionStorage.setItem('access_token', response.access_token);
                sessionStorage.setItem('user', JSON.stringify(response.user));

                toast.show({
                    title: "Hello world",
                    message: "the famous hello world",
                });

                setTimeout(() => window.location.href = '/home', 1000);

                return null;
            }

            toast.show({
                title: "Invalid Credentials",
                message: "the famous hello world",
                color: 'red'
            });
        },
        onError: (error) => {
            console.log("error", error);
        },
    });

    const handleSubmit = (data: ILogin) => {
        login.mutate({ ...data, ...{ email: data.username } });
    }

    const { classes } = loginStyles();

    return (
      <>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={20}>
            Welcome back to Mantine!
        </Title>
        <Text size={'xs'} ta={'center'} mb={30}>
            Veuillez vous connecter à votre compte et commencer l'aventure.
        </Text>
        <LoginForm onSubmit={handleSubmit} isLoading={login.isLoading} />
      </>
    );

}

export default Login;