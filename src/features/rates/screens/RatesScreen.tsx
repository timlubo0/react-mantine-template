import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IRate } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import RatesTable from "../components/tables/RatesTable";
import RateFormModal from "../components/modals/RateFormModal";
import { deleteModal } from "../../../utils/modal";
import { useRateDelete } from "../hooks/payModes";
import { toast } from "../../../utils/toast";

function RatesScreen(){

  const rateFormModal = useDisclosure(false);
  const [rate, setRate] = useState<IRate>();
  const [selectedRates, setSelectedRates] = useState<IRate[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useRateDelete({
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
            selectedRates.map((rate) => deleteMutation.mutate(`${rate.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (rates: IRate[]) => {
    rates.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedRates(rates);
  }

  const handleEdit = (rate: IRate) => {
    setRate(rate);
    rateFormModal[1].open();
  }

  const handleAdd = () => {
    setRate(undefined);
    rateFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau taux"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <RatesTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
      <RateFormModal
        opened={rateFormModal[0]}
        onClose={rateFormModal[1].close}
        rate={rate}
      />
    </Stack>
  );
}

export default RatesScreen;