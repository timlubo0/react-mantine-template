import {
    Group,
    Button,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
IconNotification,
IconCode,
IconBook,
IconChartPie3,
IconFingerprint,
IconCoin,
IconChevronDown,
} from '@tabler/icons-react';
import { headerStyles } from './styles/headerStyles';
    
  const mockdata = [
      {
          icon: IconCode,
          title: 'Open source',
          description: 'This Pokémon’s cry is very loud and distracting',
      },
      {
          icon: IconCoin,
          title: 'Free for everyone',
          description: 'The fluid of Smeargle’s tail secretions changes',
      },
      {
          icon: IconBook,
          title: 'Documentation',
          description: 'Yanma is capable of seeing 360 degrees without',
      },
      {
          icon: IconFingerprint,
          title: 'Security',
          description: 'The shell’s rounded shape and the grooves on its.',
      },
      {
          icon: IconChartPie3,
          title: 'Analytics',
          description: 'This Pokémon uses its flying ability to quickly chase',
      },
      {
          icon: IconNotification,
          title: 'Notifications',
          description: 'Combusken battles with the intensely hot flames it spews',
      },
];
  
export function MobileDrawer() {
  
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = headerStyles();
  
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
    
    return (
        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Navigation"
            className={classes.hiddenDesktop}
            zIndex={1000000}
        >
            <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <a href="#" className={classes.link}>
                Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
                <Center inline>
                <Box component="span" mr={5}>
                    Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
                Learn
            </a>
            <a href="#" className={classes.link}>
                Academy
            </a>

            <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Group position="center" grow pb="xl" px="md">
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
            </Group>
            </ScrollArea>
        </Drawer>
    );
}