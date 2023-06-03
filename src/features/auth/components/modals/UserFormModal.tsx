import { Modal } from '@mantine/core';
import { IUser } from '../../types';
import UserForm from '../forms/UserForm';
import { useUsersMutation } from '../../hooks/users';
import { toast } from '../../../../utils/toast';

interface Props{
    opened: boolean;
    onClose: () => void;
    user?: IUser; 
}

function UserFormModal({ opened, onClose, user }: Props) {

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
                centered
            >
                <UserForm onSubmit={handleSubmit} isLoading={mutation.isLoading} user={user} />
            </Modal>
        </>
    );
}

export default UserFormModal;