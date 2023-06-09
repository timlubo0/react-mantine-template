import { Modal } from '@mantine/core';
import { IRate } from '../../types';
import { toast } from '../../../../utils/toast';
import RateForm from '../forms/RateForm';
import { useRatesMutation } from '../../hooks/payModes';

interface Props{
  opened: boolean;
  onClose: () => void;
  rate?: IRate; 
  centered?: boolean; 
}

function RateFormModal({ opened, onClose, rate, centered = true }: Props) {

  const mutation = useRatesMutation({
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
    model: rate
  });

  const handleSubmit = (rate: IRate) => {
    mutation.mutate(rate);
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
        <RateForm
          onSubmit={handleSubmit}
          isLoading={mutation.isLoading}
          rate={rate}
        />
      </Modal>
    </>
  );
}

export default RateFormModal;