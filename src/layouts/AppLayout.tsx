import React from 'react';
import { AppShell, Stack, Box, useMantineColorScheme, Paper } from '@mantine/core';
import { ReactNode } from 'react';
import { excludeInAppLayoutRoutes } from '../navigation/routes';
import { useAuth } from '../features/auth/hooks/auth';
import { AppHeader } from './partials/AppHeader';
import Sidebar from './partials/Sidebar';
import AppBreadcrumbs from './partials/AppBreadcrumbs';
import AppFooter from './partials/AppFooter';

interface Props{
    children: ReactNode
}

function AppLayout({ children }: Props) {

  const { colorScheme } = useMantineColorScheme();

  const location = window.location;
  const [pathname, setPathname] = React.useState<string>(location.pathname);
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    window.location.reload();
  }

  React.useEffect(() => {
    setPathname(location.pathname);
  }, [pathname, location, auth.accessToken]);

  if (excludeInAppLayoutRoutes.includes(pathname)) return <>{children}</>;

  return (
    <AppShell
      padding="md"
      // navbar={
      //   <Navbar width={{ base: 300 }} height={500} p="xs">
      //     Sidebar content
      //   </Navbar>
      // }
      header={
        <Stack>
          <AppHeader />
          <Sidebar />
        </Stack>
      }
      footer={<AppFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Stack mt={-40}>
        <AppBreadcrumbs />
        {pathname === "/home" ? (
          <Box
            p={"md"}
            maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
            miw={{ xl: 1200 }}
            mx={{ xl: "auto" }}
            mih={"100vh"}
          >
            {children}
          </Box>
        ) : (
          <Paper
            p={"md"}
            maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
            miw={{ xl: 1200 }}
            mx={{ xl: "auto" }}
            mih={"100vh"}
            withBorder
          >
            {children}
          </Paper>
        )}
      </Stack>
    </AppShell>
  );
}

export default AppLayout;