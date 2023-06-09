import { Modal } from '@mantine/core';
import { toast } from '../../../../utils/toast';
import { useAuth, useResetPasswordOtp } from '../../hooks/auth';
import ResetPasswordForm from '../forms/ResetPasswordForm';

interface Props{
    opened: boolean;
    onClose: () => void;
    centered?: boolean;  
}

function ResetPasswordFormModal({ opened, onClose, centered = true }: Props) {

    const auth = useAuth();

    const mutation = useResetPasswordOtp({
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

    const handleSubmit = (user: any) => {
        mutation.mutate({...user, ...{ password: user.currentPassword, email: auth.user.email }});
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
                <ResetPasswordForm onSubmit={handleSubmit} isLoading={false} />
            </Modal>
        </>
    );
}

export default ResetPasswordFormModal;