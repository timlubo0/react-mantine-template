import { createStyles } from "@mantine/core";

export const styles = createStyles((theme) => ({
    user: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      transition: 'background-color 100ms ease',
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      },
  
      [theme.fn.smallerThan('xs')]: {
        display: 'none',
      },
    },
  
    userActive: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  
}));
  