import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { PasswordInput, TextInput, Button, Box, Group, Checkbox, Flex, Anchor } from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';
import { ILogin } from '../../types';
import { Link } from 'react-router-dom';

interface Props{
    onSubmit: (data: ILogin) => void;
    isLoading: boolean;
}

function LoginForm({ onSubmit, isLoading }: Props) {

    const schema = z.object({
        username: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(8, { message: 'Invalid password' }),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            username: '',
            password: '',
        },
    });

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="example@mail.com"
                    {...form.getInputProps("username")}
                    icon={<IconMail size={'1rem'} />}
                />
                <PasswordInput
                    placeholder="Mot de passe"
                    label="Mot de passe"
                    withAsterisk
                    {...form.getInputProps("password")}
                    icon={<IconLock size={'1rem'} />}
                />
                <Flex justify={'space-between'}>
                    <Checkbox label="Se souvenir de moi" mt="xl" size="xs" />
                    <Anchor size={'xs'} mt="xl">
                        <Link to={''}>
                            Mot de passe oublié?
                        </Link>
                    </Anchor>
                </Flex>
                <Group mt="xl">
                    <Button fullWidth mt="xl" size="md" type="submit" loading={isLoading}>S'authentifier</Button>
                </Group>
            </form>
        </Box>
    );
}

export default LoginForm;