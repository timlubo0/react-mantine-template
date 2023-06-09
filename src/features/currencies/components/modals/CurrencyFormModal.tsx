import { Modal } from '@mantine/core';
import { ICurrency } from '../../types';
import { toast } from '../../../../utils/toast';
import CurrencyForm from '../forms/CurrencyForm';
import { useCurrenciesMutation } from '../../hooks/currencies';

interface Props{
    opened: boolean;
    onClose: () => void;
    currency?: ICurrency; 
    centered?: boolean; 
}

function CurrencyFormModal({ opened, onClose, currency, centered = true }: Props) {

    const mutation = useCurrenciesMutation({
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
      model: currency
    });

    const handleSubmit = (currency: ICurrency) => {
        mutation.mutate(currency);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Devise"
                size={'lg'}
                centered={centered}
            >
                <CurrencyForm onSubmit={handleSubmit} isLoading={mutation.isLoading} currency={currency} />
            </Modal>
        </>
    );
}

export default CurrencyFormModal;