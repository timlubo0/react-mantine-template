import { Modal } from '@mantine/core';
import { IUser } from '../../types';
import UserForm from '../forms/UserForm';
import { useUsersMutation } from '../../hooks/users';
import { toast } from '../../../../utils/toast';

interface Props{
    opened: boolean;
    onClose: () => void;
    user?: IUser;
    centered?: boolean;  
}

function UserFormModal({ opened, onClose, user, centered = true }: Props) {

    const mutation = useUsersMutation({
      onSuccess: (response) => {
        if(response.status === true){
            onClose();
            toast.success();
            
            return null;
        }

        toast.error();
      },
      onError: () => {
        toast.error();
      },
      model: user
    });

    const handleSubmit = (user: IUser) => {
        mutation.mutate({...user, ...{ role_id: user.roleId }});
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Utilisateur"
                size={'lg'}
                centered={centered}
            >
                <UserForm onSubmit={handleSubmit} isLoading={mutation.isLoading} user={user} />
            </Modal>
        </>
    );
}

export default UserFormModal;