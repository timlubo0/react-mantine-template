import { TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface Props{
  onChange?: (keyword: string) => void;
}

export default function InputSearch({ onChange }: Props) {

  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="xs"
      placeholder="Search questions"
      rightSectionWidth={42}
      w={500}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}