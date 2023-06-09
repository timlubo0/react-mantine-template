import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import UsersTable from "../components/tables/UsersTable";
import CrudHeader from "../../../components/CrudHeader";
import { IUser } from "../types";
import UserFormModal from "../components/modals/UserFormModal";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import { useUserDelete } from "../hooks/users";
import { toast } from "../../../utils/toast";
import { deleteModal } from "../../../utils/modal";

function UsersScreen(){

    const userFormModal = useDisclosure(false);
    const [user, setUser] = useState<IUser>();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [showActions, setShowActions] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>();

    const deleteMutation = useUserDelete({
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
              selectedUsers.map((user) => deleteMutation.mutate(`${user.uid}`));
            },
        }),
      },
    ];

    const handleSelection = (users: IUser[]) => {
        users.length > 0 ? setShowActions(true) : setShowActions(false);
        setSelectedUsers(users);
    }

    const handleEdit = (user: IUser) => {
        setUser(user);
        userFormModal[1].open();
    }

    const handleAdd = () => {
        setUser(undefined);
        userFormModal[1].open();
    }
    
    return (
      <Stack>
        <CrudHeader
          onButtonClick={handleAdd}
          buttonTitle="Nouvel Utilisateur"
          actions={crudActions}
          showActions={showActions}
          onSearch={(keyword) => setKeyword(keyword)}
        />
        <UsersTable
          onEdit={handleEdit}
          onSelect={handleSelection}
          filters={{ keyword: keyword }}
        />
        <UserFormModal
          opened={userFormModal[0]}
          onClose={userFormModal[1].close}
          user={user}
        />
      </Stack>
    );
}

export default UsersScreen;