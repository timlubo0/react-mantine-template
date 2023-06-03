import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { IconMail, IconUser } from '@tabler/icons-react';
import { IRole } from '../../types';

interface Props{
  onSubmit: (data: IRole) => void;
  isLoading: boolean;
  role?: IRole;
}

function RoleForm({ onSubmit, isLoading, role }: Props) {

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    description: z.string().optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: role?.name || '',
      description: role?.description || ''
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          withAsterisk
          label="Designation"
          placeholder="Designation..."
          {...form.getInputProps("name")}
          icon={<IconUser size={"1rem"} />}
        />
        <Textarea
          label="Description"
          placeholder="Description..."
          {...form.getInputProps("description")}
        />
   
        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default RoleForm;