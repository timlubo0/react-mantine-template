import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { ICity } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import CitiesTable from "../components/tables/CitiesTable";
import CityFormModal from "../components/modals/CityFormModal";
import { deleteModal } from "../../../utils/modal";
import { useCityDelete } from "../hooks/roles";
import { toast } from "../../../utils/toast";

function CitiesScreen(){

  const cityFormModal = useDisclosure(false);
  const [city, setCity] = useState<ICity>();
  const [selectedCities, setSelectedCities] = useState<ICity[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useCityDelete({
    onSuccess: (response) => {
      if(response.status === true){
        toast.success();
        return null;
      }

      toast.error();
    },
    onError: (errors) => {},
  });

  const crudActions: CrudActionProps[] = [
    {
      title: "supprimer",
      icon: IconTrash,
      color: "red",
      onClick: () =>
        deleteModal.show({
          onConfirm: () => {
            selectedCities.map((city) => deleteMutation.mutate(`${city.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (cities: ICity[]) => {
    cities.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedCities(cities);
  }

  const handleEdit = (city: ICity) => {
    setCity(city);
    cityFormModal[1].open();
  }

  const handleAdd = () => {
    setCity(undefined);
    cityFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvelle ville"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <CitiesTable
        onEdit={handleEdit}
        onSelect={handleSelection}
        filters={{ keyword: keyword }}
      />
      <CityFormModal
        opened={cityFormModal[0]}
        onClose={cityFormModal[1].close}
        city={city}
      />
    </Stack>
  );
}

export default CitiesScreen;