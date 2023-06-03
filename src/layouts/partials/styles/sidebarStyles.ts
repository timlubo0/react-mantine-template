import { createStyles, rem } from "@mantine/core";

export const sidebarStyles = createStyles((theme) => ({
    header: {
      paddingTop: 45,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      borderBottom: `${rem(1)} solid ${
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
      }`,
    },
  
    tabs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    tabsList: {
      borderBottom: '0 !important',
    },
  
    tab: {
      fontWeight: 500,
      height: rem(38),
      color: theme.white,
      backgroundColor: 'transparent',
      borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  
      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
      },
  
      '&[data-active]': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
        borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      },
    },
}));