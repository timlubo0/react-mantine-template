import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { PasswordInput, TextInput, Button, Box, Group } from '@mantine/core';
import { IconLock, IconPassword } from '@tabler/icons-react';
import InputPasswordWrapper from '../../../../components/InputPasswordWrapper';

interface Props {
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
    otp: string;
  }) => void;
  isLoading: boolean;
}

function ResetPasswordForm({ onSubmit, isLoading }: Props) {

  const schema = z.object({
    currentPassword: z.string().min(8, { message: "Minimum 8 caracteres" }),
    otp: z
      .string()
      .max(5, { message: "maximum 5 chiffres" })
      .min(5, { message: "minimum 5 chiffres" }),
    newPassword: z
      .string()
      .min(8, 'Includes at least 8 characters')
      .refine((value) => /[0-9]/.test(value), "Includes number")
      .refine((value) => /[a-z]/.test(value), "Includes lowercase letter")
      .refine((value) => /[A-Z]/.test(value), "Includes uppercase letter")
      .refine((value) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(value), "Includes special symbol"),
    roleId: z.string(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      currentPassword: '',
      newPassword: '',
      otp: '',
    },
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Group grow>
          <PasswordInput
            placeholder="Mot de passe"
            label="Mot de passe actuel"
            withAsterisk
            {...form.getInputProps("currentPassword")}
            icon={<IconLock size={'1rem'} />}
          />
          {/* <InputPasswordWrapper value={form.values.newPassword}> */}
            <PasswordInput
              placeholder="Mot de passe"
              label="Nouveau Mot de passe"
              withAsterisk
              {...form.getInputProps("newPassword")}
              icon={<IconLock size={"1rem"} />}
            />
          {/* </InputPasswordWrapper> */}
        </Group>
        <TextInput
          withAsterisk
          label="Code OTP"
          placeholder="OTP"
          {...form.getInputProps("otp")}
          icon={<IconPassword size={"1rem"} />}
        />
        <Group mt="xl" position="right">
          <Button onClick={() => onSubmit(form.values)} mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default ResetPasswordForm;