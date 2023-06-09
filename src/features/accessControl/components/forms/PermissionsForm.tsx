import { useForm } from '@mantine/form';
import { Button, Box, Group, Checkbox, Flex } from '@mantine/core';
import { IFeature, IPermission, IRole } from '../../types';
import { useFeatures } from '../../hooks/features';

interface Props{
  onSubmit: (data: IPermission[]) => void;
  isLoading: boolean;
  role: IRole;
  permissions: Record<any, any>;
}

function PermissionsForm({ onSubmit, isLoading, role, permissions }: Props) {
  const featuresQuery = useFeatures({ per_page: 30 });

  const form = useForm({ initialValues: permissions });

  const handleSubmit = (values: Record<string, unknown>) => {
    const permissions: IPermission[] = [];

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const checkedValues = values[key];

        if(Array.isArray(checkedValues) && featuresQuery.data){
          const feature = featuresQuery.data.find((feature: IFeature) => feature.id == key);
          const permission: IPermission = {
            feature: feature,
            role: role,
            canCreate: checkedValues.includes('create'),
            canRead: checkedValues.includes('read'),
            canUpdate: checkedValues.includes('update'),
            canDelete: checkedValues.includes('delete'),
          }

          permissions.push(permission);
        }
      }
    }

    onSubmit(permissions);
  }

    return (
      <Box>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex mt={15} direction={"column"} gap={15}>
            {!featuresQuery.isLoading &&
              featuresQuery.data.map((feature: IFeature) => (
                <Checkbox.Group
                    key={feature.uid}
                    label={feature.name}
                    description={feature.description || feature.name}
                    {...form.getInputProps(`${feature.id}`)}
                >
                  <Group mt="xs">
                    <Checkbox value="create" label="Créer" />
                    <Checkbox value="read" label="Voir" />
                    <Checkbox value="update" label="Modifier" />
                    <Checkbox value="delete" label="Supprimer" />
                  </Group>
                </Checkbox.Group>
              ))}
          </Flex>

          <Group mt="xl" position="right">
            <Button mt="xl" size="sm" type="submit" loading={isLoading}>
              Enregistrer
            </Button>
          </Group>
        </form>
      </Box>
    );
}

export default PermissionsForm;