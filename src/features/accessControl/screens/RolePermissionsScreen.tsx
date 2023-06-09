import { useMemo } from "react";
import { Box, Group, Title, Badge, Loader, Flex, Center } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useRole } from "../hooks/roles";
import PermissionsForm from "../components/forms/PermissionsForm";
import { IPermission } from "../types";
import { usePermissionsMutation } from "../hooks/permissions";
import { toast } from "../../../utils/toast";

function RolePermissionsScreen(){

  const { uid } = useParams();
  const roleQuery = useRole(`${uid}`);

  const permissions = useMemo(() => {
    const data = roleQuery.data?.permissions?.reduce(
      (obj: Record<any, any>, permission) => (
        (obj[`${permission.feature?.id}`] = [
          permission.canCreate && "create",
          permission.canRead && "read",
          permission.canUpdate && "update",
          permission.canDelete && "delete",
        ]),
        obj
      ),
      {}
    );
    return data;
  }, [roleQuery.data]);

  const mutation = usePermissionsMutation({
    onSuccess: (response) => {
      if(response.status === true){
        toast.success();
        return null;
      }
      toast.error();
    },
    onError: () => {
      toast.error();
    },
    uid: uid || ''
  });

  const handleSubmit = (data: IPermission[]) => {
    const permissions = data.map((permission) => ({
      role_id: permission.role.id,
      feature_id: permission.feature.id,
      can_create: permission.canCreate,
      can_read: permission.canRead,
      can_update: permission.canUpdate,
      can_delete: permission.canDelete
    }));

    mutation.mutate(permissions);
  }

  return (
    <Box>
      <Group>
        <Title size={25}>Permissions du role</Title>
        {!roleQuery.isLoading && roleQuery.data && (
          <Badge tt={"capitalize"}>{roleQuery.data.name}</Badge>
        )}
      </Group>
      {(!roleQuery.isLoading && roleQuery.data && permissions) && (
        <PermissionsForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          role={roleQuery.data}
          permissions={permissions}
        />
      )}
      {
        roleQuery.isLoading && <Center><Loader /></Center>
      }
    </Box>
  );

}

export default RolePermissionsScreen;