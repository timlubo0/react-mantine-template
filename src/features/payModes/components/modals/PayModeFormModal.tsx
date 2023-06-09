import { Modal } from '@mantine/core';
import { IPayMode } from '../../types';
import { toast } from '../../../../utils/toast';
import PayModeForm from '../forms/PayModeForm';
import { usePayModesMutation } from '../../hooks/payModes';

interface Props{
  opened: boolean;
  onClose: () => void;
  payMode?: IPayMode; 
  centered?: boolean; 
}

function PayModeFormModal({ opened, onClose, payMode, centered = true }: Props) {

  const mutation = usePayModesMutation({
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
    model: payMode
  });

  const handleSubmit = (payMode: IPayMode) => {
    mutation.mutate(payMode);
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
        <PayModeForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          payMode={payMode}
        />
      </Modal>
    </>
  );
}

export default PayModeFormModal;