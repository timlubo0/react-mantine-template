import { useState } from 'react';
import {
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
} from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import { styles } from './styles';
import { useAuth } from '../../hooks/auth';

export default function UserAvatar() {
  const { classes, theme, cx } = styles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useAuth();

  return (
    <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
    >
        <Menu.Target>
        <UnstyledButton
            className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
            <Group spacing={7}>
            <Avatar alt={user.name} radius="xl" size={30} color="blue">TM</Avatar>
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
        </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
        <Menu.Item
            icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />}
        >
            Liked posts
        </Menu.Item>
        <Menu.Item
            icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5} />}
        >
            Saved posts
        </Menu.Item>
        <Menu.Item
            icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5} />}
        >
            Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
            Account settings
        </Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
            Change account
        </Menu.Item>
        <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
            Pause subscription
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
            Delete account
        </Menu.Item>
        </Menu.Dropdown>
    </Menu>
  );
}