import { Modal } from '@mantine/core';
import { IUSerPayMode } from '../../types';
import { toast } from '../../../../utils/toast';
import { useUserPayModesMutation } from '../../hooks/userPayModes';
import UserPayModeForm from '../forms/UserPayModeForm';

interface Props{
  opened: boolean;
  onClose: () => void;
  userPayMode?: IUSerPayMode; 
  centered?: boolean; 
}

function UserPayModeFormModal({ opened, onClose, userPayMode, centered = true }: Props) {

  const mutation = useUserPayModesMutation({
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
    model: userPayMode
  });

  const handleSubmit = (userPayMode: IUSerPayMode) => {
    mutation.mutate(userPayMode);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Devise"
        size={"lg"}
        centered={centered}
      >
        <UserPayModeForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          userPayMode={userPayMode}
        />
      </Modal>
    </>
  );
}

export default UserPayModeFormModal;