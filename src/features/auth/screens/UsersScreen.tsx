import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import UsersTable from "../components/tables/UsersTable";
import CrudHeader from "../../../components/CrudHeader";
import { IUser } from "../types";
import UserFormModal from "../components/modals/UserFormModal";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";

function UsersScreen(){

    const userFormModal = useDisclosure(false);
    const [user, setUser] = useState<IUser>();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [showActions, setShowActions] = useState<boolean>(false);

    const crudActions: CrudActionProps[] = [
        {
            title: 'supprimer',
            icon: IconTrash,
            color: 'red',
            onClick: () => {

                console.log('ready to delete:', selectedUsers);
                
            },
        }
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
        />
        <UsersTable onEdit={handleEdit} onSelect={handleSelection} />
        <UserFormModal
            opened={userFormModal[0]}
            onClose={userFormModal[1].close}
            user={user}
        />
      </Stack>
    );
}

export default UsersScreen;