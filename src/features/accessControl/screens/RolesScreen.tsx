import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IRole } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import RolesTable from "../components/tables/RolesTable";
import RoleFormModal from "../components/modals/RoleFormModal";
import { deleteModal } from "../../../utils/modal";
import { useRoleDelete } from "../hooks/roles";
import { toast } from "../../../utils/toast";

function RolesScreen(){

  const roleFormModal = useDisclosure(false);
  const [role, setRole] = useState<IRole>();
  const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useRoleDelete({
    onSuccess: (response) => {
      if(response.status === true){
        toast.success();
        return null;
      }

      toast.error();
    },
    onError: (errors) => {},
  });

  const crudActions: CrudActionProps[] = [
    {
      title: "supprimer",
      icon: IconTrash,
      color: "red",
      onClick: () =>
        deleteModal.show({
          onConfirm: () => {
            selectedRoles.map((role) => deleteMutation.mutate(`${role.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (roles: IRole[]) => {
    roles.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedRoles(roles);
  }

  const handleEdit = (role: IRole) => {
    setRole(role);
    roleFormModal[1].open();
  }

  const handleAdd = () => {
    setRole(undefined);
    roleFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau role"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <RolesTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
      <RoleFormModal
        opened={roleFormModal[0]}
        onClose={roleFormModal[1].close}
        role={role}
      />
    </Stack>
  );
}

export default RolesScreen;