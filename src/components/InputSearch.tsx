import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

export default function InputSearch(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="xs"
        // rightSection={
        //     <ActionIcon size={20} radius="xl" color={theme.primaryColor} variant="filled">
        //     {theme.dir === 'ltr' ? (
        //         <IconArrowRight size="1.1rem" stroke={1.5} />
        //     ) : (
        //         <IconArrowLeft size="1.1rem" stroke={1.5} />
        //     )}
        //     </ActionIcon>
        // }
        placeholder="Search questions"
        rightSectionWidth={42}
        w={500}
        {...props}
    />
  );
}