import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { PasswordInput, TextInput, Button, Box, Group, NativeSelect, ActionIcon, Loader } from '@mantine/core';
import { IconLock, IconMail, IconUser, IconPhone, IconCirclePlus } from '@tabler/icons-react';
import { IUser } from '../../types';
import InputPasswordWrapper from '../../../../components/InputPasswordWrapper';
import { useRoles } from '../../../accessControl/hooks/roles';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';
import RoleFormModal from '../../../accessControl/components/modals/RoleFormModal';

interface Props{
  onSubmit: (data: IUser) => void;
  isLoading: boolean;
  user?: IUser;
}

function UserForm({ onSubmit, isLoading, user }: Props) {
  const roleFormModal = useDisclosure();

  const schema = z.object({
    name: z.string().min(3, { message: "Minimum 3 caracteres" }),
    email: z.string().email({ message: "Email invalide" }),
    phone: z
      .string()
      .max(12, { message: "maximum 9 chiffres" })
      .min(9, { message: "minimum 9 chiffres" }),
    password: z
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
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: user ? 'timS@234!' : '',
      roleId: user?.role?.id || ''
    },
  });

  const rolesQuery = useRoles();

  const roles = useSelectMemo({ data: rolesQuery.data });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <TextInput
            withAsterisk
            label="Nom complet"
            placeholder="Nom & Prenom"
            {...form.getInputProps("name")}
            icon={<IconUser size={"1rem"} />}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
            icon={<IconMail size={"1rem"} />}
          />
        </Group>
        <TextInput
          withAsterisk
          label="Phone"
          type="number"
          description="Le numéro de téléphone doit avoir 9 chiffres"
          placeholder="99.."
          {...form.getInputProps("phone")}
          icon={<IconPhone size={"1rem"} />}
        />
        <NativeSelect
          withAsterisk
          label="Role"
          placeholder="Choisissez un role"
          data={roles}
          {...form.getInputProps("roleId")}
          rightSection={
            <ActionIcon onClick={() => roleFormModal[1].open()}>
              {!rolesQuery.isLoading && <IconCirclePlus size={"1.45rem"} />}
              {rolesQuery.isLoading && <Loader size={"xs"} />}
            </ActionIcon>
          }
        />

        {user === undefined && (
          <Group grow>
            <InputPasswordWrapper value={form.values.password}>
              <PasswordInput
                placeholder="Mot de passe"
                label="Mot de passe"
                withAsterisk
                {...form.getInputProps("password")}
                icon={<IconLock size={"1rem"} />}
              />
            </InputPasswordWrapper>
            {/* <PasswordInput
                      placeholder="Mot de passe"
                      label="Confirmer"
                      withAsterisk
                      {...form.getInputProps("confirmPassword")}
                      icon={<IconLock size={'1rem'} />}/> */}
          </Group>
        )}

        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
      <RoleFormModal
        opened={roleFormModal[0]}
        onClose={roleFormModal[1].close}
        centered={false}
      />
    </Box>
  );
}

export default UserForm;