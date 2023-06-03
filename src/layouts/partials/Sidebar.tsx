import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));


export default function Sidebar() {

  const links = [
    {
      "link": "/about",
      "label": "Dashboard"
    },
    {
      "link": "/pricing",
      "label": "Pricing"
    },
    {
      "link": "/learn",
      "label": "Learn"
    },
    {
      "link": "/community",
      "label": "Community"
    }
  ];

  const [opened, { close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header
      height={HEADER_HEIGHT}
      className={classes.root}
      maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
      miw={{ xl: 1200 }}
      mx={{ xl: "auto" }}
    >
      <Container className={classes.header} mx={0}>
        {items}
      </Container>
    </Header>
  );
}