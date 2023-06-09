import { Modal } from '@mantine/core';
import { ICity } from '../../types';
import { toast } from '../../../../utils/toast';
import CityForm from '../forms/CityForm';
import { useCitiesMutation } from '../../hooks/roles';

interface Props{
    opened: boolean;
    onClose: () => void;
    city?: ICity;
    centered?: boolean;  
}

function CityFormModal({ opened, onClose, city, centered = true }: Props) {

    const mutation = useCitiesMutation({
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
      model: city
    });

    const handleSubmit = (city: ICity) => {
        mutation.mutate(city);
    };

    return (
        <>
            <Modal 
                opened={opened} 
                onClose={onClose} 
                title="Ville"
                size={'lg'}
                centered={centered}
            >
                <CityForm onSubmit={handleSubmit} isLoading={mutation.isLoading} city={city} />
            </Modal>
        </>
    );
}

export default CityFormModal;