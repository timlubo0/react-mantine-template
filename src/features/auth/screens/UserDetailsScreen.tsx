import { Group, Paper, Stack, Box, Flex, Avatar, ActionIcon, Title, Text, Button, Tabs, Badge, Skeleton } from "@mantine/core";
import { IconDotsVertical, IconMail, IconLock, IconSettings, IconMoneybag, IconBell } from '@tabler/icons-react';
import { useDisclosure } from "@mantine/hooks";
import UserPayModesScreen from "../../payModes/screens/UserPayModesScreen";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/users";
import ResetPasswordFormModal from "../components/modals/ResetPasswordFormModal";
import { IUser } from "../types";

interface Props{
  user?: IUser;
}

function UserDetailsScreen({ user }: Props){

    const { uid } = useParams();
    const userQuery = useUser(`${uid}`);
    let { data, isLoading } = userQuery;
    data = user ? user : data;
    
    const resetPasswordFormModal = useDisclosure();

    return (
      <>
        <Stack>
          <Paper withBorder m={5}>
            <Flex direction={"column"}>
              <Box bg={"gray"} miw={"100%"} w={"100%"} h={100} />
              <Flex justify={"space-between"} mx={20}>
                <Skeleton circle visible={isLoading}>
                  <Avatar
                    color="blue"
                    radius="100%"
                    size={80}
                    mt={-40}
                    tt={"uppercase"}
                  >
                    {`${data?.name?.charAt(0)}${data?.name?.charAt(1)}`}
                  </Avatar>
                </Skeleton>
                <ActionIcon>
                  <IconDotsVertical />
                </ActionIcon>
              </Flex>
              <Stack mx={20} pb={10}>
                <Skeleton w={300} radius="xl" visible={isLoading}>
                  <Title size={25}>{data?.name}</Title>
                </Skeleton>
                <Skeleton w={200} radius="xl" visible={isLoading}>
                  <Text size={"xs"}>Lubumbashi, DRC Congo</Text>
                </Skeleton>
                <Group>
                  <Text size={"xs"} fw={"bolder"}>
                    {data?.email}
                  </Text>
                  <Text size={"xs"}>.</Text>
                  <Text size={"xs"} fw={"bold"}>
                    {data?.role?.name}
                  </Text>
                  <Text size={"xs"}>.</Text>
                  <Text size={"xs"} color="green">
                    Active
                  </Text>
                </Group>
                {user ? (
                  <Group>
                    <Button
                      size="xs"
                      variant="light"
                      leftIcon={<IconMail size={"1.10rem"} />}
                    >
                      Modifier l'email
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      leftIcon={<IconLock size={"1.10rem"} />}
                      onClick={() => resetPasswordFormModal[1].open()}
                    >
                      Modifier le mot de passe
                    </Button>
                  </Group>
                ) : (
                  <></>
                )}
              </Stack>
            </Flex>
          </Paper>

          <Tabs defaultValue="userPayModes" mx={5}>
            <Tabs.List>
              <Tabs.Tab
                value="userPayModes"
                icon={<IconMoneybag size="0.8rem" />}
              >
                Moyens de paiement
              </Tabs.Tab>
              <Tabs.Tab
                value="messages"
                icon={<IconBell size="0.8rem" />}
                rightSection={
                  <Badge
                    w={16}
                    h={16}
                    sx={{ pointerEvents: "none" }}
                    variant="filled"
                    size="xs"
                    p={0}
                  >
                    6
                  </Badge>
                }
              >
                Notifications
              </Tabs.Tab>
              <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
                Parametres
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="userPayModes" pt="xs">
              <UserPayModesScreen userId={data?.id} />
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
              Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xs">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Stack>
        <ResetPasswordFormModal
          opened={resetPasswordFormModal[0]}
          onClose={resetPasswordFormModal[1].close}
        />
      </>
    );
}

export default UserDetailsScreen;