import React from "react";
import { Group, Paper } from "@mantine/core";
import Login from "../components/Login";
import { loginStyles } from "../styles/loginStyles";
import ThemeModeSwitcher from "../../../components/ThemeModeSwitcher";

function LoginScreen(){

    const { classes } = loginStyles();

    return(
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Group position="center">
                    <ThemeModeSwitcher />
                </Group>
                <Login />
            </Paper>
        </div>
    )

}

export default LoginScreen;