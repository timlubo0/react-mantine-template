import {
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  rem,
  Indicator,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconBell,
  IconScreenShare,
  IconSettings,
  IconHelpCircle
} from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';
import { headerStyles } from './styles/headerStyles';
import UserAvatar from '../../features/auth/components/avatar/UserAvatar';
import ThemeModeSwitcher from '../../components/ThemeModeSwitcher';
import { MobileDrawer } from './MobileDrawer';
import { Link } from 'react-router-dom';
import { useFeaturePermissions } from '../../features/accessControl/hooks/permissions';
import { topMenu } from '../../navigation/menu';

export function AppHeader() {

  const permissionsChecker = useFeaturePermissions();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { toggle, fullscreen } = useFullscreen();
  const { classes, theme } = headerStyles();

  const links = topMenu.map((item) => (
    <div key={item.title}>
      {permissionsChecker(item.href)?.canRead && (
        <Link to={item.href}>
          <UnstyledButton className={classes.subLink}>
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
        </Link>
      )}
    </div>
  ));
  
  return (
    <Box pb={50}>
      <Header
        height={60}
        px="md"
        maw={{ sm: "full", md: "full", lg: "full", xl: 1200 }}
        miw={{ xl: 1200 }}
        mx={{ xl: "auto" }}
      >
        <Group position="apart" sx={{ height: "100%" }}>
          <Group>
            <Text>Logo here</Text>

            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Group spacing={4}>
                        <IconSettings size={18} />
                        <Box component="span" mr={5}>
                          Parametres
                        </Box>
                        <IconChevronDown
                          size={16}
                          color={theme.fn.primaryColor()}
                        />
                      </Group>
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text fw={500}>Parametres</Text>
                    <Anchor href="#" fz="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group position="apart">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" color="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className={classes.link}>
                <Center inline>
                  <Group spacing={4}>
                    <IconHelpCircle size={18} />
                    <Box component="span">Aide</Box>
                  </Group>
                </Center>
              </a>
            </Group>
          </Group>

          <Group className={classes.hiddenMobile}>
            <ActionIcon>
              <IconScreenShare onClick={toggle} color={fullscreen ? 'red' : 'blue'} size="1.125rem" />
            </ActionIcon>
            <ActionIcon>
              <Indicator label="0" size={10}>
                <IconBell size="1.125rem" />
              </Indicator>
            </ActionIcon>
            <UserAvatar />
            <ThemeModeSwitcher />
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <MobileDrawer />
    </Box>
  );
}