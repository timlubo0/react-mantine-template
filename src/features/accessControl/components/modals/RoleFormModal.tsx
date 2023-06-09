import { Modal } from '@mantine/core';
import { IRole } from '../../types';
import { toast } from '../../../../utils/toast';
import RoleForm from '../forms/RoleForm';
import { useRolesMutation } from '../../hooks/roles';

interface Props{
    opened: boolean;
    onClose: () => void;
    role?: IRole;
    centered?: boolean; 
}

function RoleFormModal({ opened, onClose, role, centered = true }: Props) {

    const mutation = useRolesMutation({
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
      model: role
    });

    const handleSubmit = (role: IRole) => {
        mutation.mutate(role);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Role"
                size={'lg'}
                centered={centered}
            >
                <RoleForm onSubmit={handleSubmit} isLoading={mutation.isLoading} role={role} />
            </Modal>
        </>
    );
}

export default RoleFormModal;