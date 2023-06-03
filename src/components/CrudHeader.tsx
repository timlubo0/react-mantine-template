import { Flex, Button, Alert, Stack, Group, Text } from "@mantine/core";
import { IconAlertCircle, IconCirclePlus } from '@tabler/icons-react';
import InputSearch from "./InputSearch";
import CrudActionButtons, { CrudActionProps } from "./CrudActionButtons";

interface Props{
    buttonTitle: string;
    onButtonClick: () => void;
    actions?: CrudActionProps[];
    showActions?: boolean;
}

function CrudHeader({ onButtonClick, buttonTitle, actions, showActions = false }: Props){

    return (
      <Stack>
        <Flex justify={"space-between"}>
          <Flex w={800}>
            <InputSearch />
          </Flex>
          <Button
            onClick={onButtonClick}
            leftIcon={<IconCirclePlus size="1rem" />}
            size="xs"
          >
            {buttonTitle}
          </Button>
        </Flex>
        {showActions && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="blue"
          >
            <Group position="apart">
              <Text>
                Something terrible happened! You made a mistake and there is no
                going back, your data was lost forever!
              </Text>
              <CrudActionButtons actions={actions} />
            </Group>
          </Alert>
        )}
      </Stack>
    );

}

export default CrudHeader;