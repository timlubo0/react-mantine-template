import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IUSerPayMode } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import { deleteModal } from "../../../utils/modal";
import { toast } from "../../../utils/toast";
import { useUserPayModeDelete } from "../hooks/userPayModes";
import UserPayModesTable from "../components/tables/UserPayModesTable";
import UserPayModeFormModal from "../components/modals/UserPayModeFormModal";
import { useFeaturePermissions } from "../../accessControl/hooks/permissions";
import { Routes } from "../../../navigation/routes";

interface Props{
  userId?: string;
}

function UserPayModesScreen({ userId }: Props){

  const userPayModeFormModal = useDisclosure(false);
  const [userPayMode, setUserPayMode] = useState<IUSerPayMode>();
  const [selectedUserPayModes, setSelectedUserPayModes] = useState<IUSerPayMode[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();
  const permissionsChecker = useFeaturePermissions();

  const deleteMutation = useUserPayModeDelete({
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
            selectedUserPayModes.map((userPayMode) => deleteMutation.mutate(`${userPayMode.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (userPayModes: IUSerPayMode[]) => {
    userPayModes.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedUserPayModes(userPayModes);
  }

  const handleEdit = (userPayMode: IUSerPayMode) => {
    setUserPayMode(userPayMode);
    userPayModeFormModal[1].open();
  }

  const handleAdd = () => {
    setUserPayMode(undefined);
    userPayModeFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau moyen de paiement"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
        canCreate={permissionsChecker(Routes.payModes)?.canCreate}
      />
      <UserPayModesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword, userId: userId }}
      />
      <UserPayModeFormModal
        opened={userPayModeFormModal[0]}
        onClose={userPayModeFormModal[1].close}
        userPayMode={userPayMode}
      />
    </Stack>
  );
}

export default UserPayModesScreen;