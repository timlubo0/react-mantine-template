import { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { sideMenu } from '../../navigation/menu';
import { Link } from 'react-router-dom';
import { useFeaturePermissions } from '../../features/accessControl/hooks/permissions';

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

  const links = sideMenu;

  const [opened, { close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].href);
  const { classes, cx } = useStyles();

  const permissionsChecker = useFeaturePermissions();

  const items = links.map((link) =>
    permissionsChecker(link.href)?.canRead ? (
      <Link
        key={link.title}
        to={link.href}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.href,
        })}
        onClick={() => {
          setActive(link.href);
          close();
        }}
      >
        {link.title}
      </Link>
    ) : (
      <></>
    )
  );

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