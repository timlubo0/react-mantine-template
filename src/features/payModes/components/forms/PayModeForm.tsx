import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Box, Group, Textarea } from '@mantine/core';
import { IPayMode } from '../../types';

interface Props{
  onSubmit: (data: IPayMode) => void;
  isLoading: boolean;
  payMode?: IPayMode;
}

function PayModeForm({ onSubmit, isLoading, payMode }: Props) {

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 caracteres" })
      .max(45, { message: "Maximum 45 caracteres" }),
    description: z
      .string()
      .max(120, { message: "Maximum 120 caracteres" })
      .optional(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: payMode?.name || '',
      description: payMode?.description || ''
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

export default PayModeForm;