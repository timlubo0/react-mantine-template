import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { ICurrency } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import CurrenciesTable from "../components/tables/CurrenciesTable";
import CurrencyFormModal from "../components/modals/CurrencyFormModal";
import { deleteModal } from "../../../utils/modal";
import { useCurrencyDelete } from "../hooks/currencies";
import { toast } from "../../../utils/toast";

function CurrenciesScreen(){

  const currencyFormModal = useDisclosure(false);
  const [currency, setCurrency] = useState<ICurrency>();
  const [selectedCurrencies, setSelectedCurrencies] = useState<ICurrency[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = useCurrencyDelete({
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
            selectedCurrencies.map((currency) => deleteMutation.mutate(`${currency.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (currencies: ICurrency[]) => {
    currencies.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedCurrencies(currencies);
  }

  const handleEdit = (currency: ICurrency) => {
    setCurrency(currency);
    currencyFormModal[1].open();
  }

  const handleAdd = () => {
    setCurrency(undefined);
    currencyFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouvelle devise"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <CurrenciesTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
      <CurrencyFormModal
        opened={currencyFormModal[0]}
        onClose={currencyFormModal[1].close}
        currency={currency}
      />
    </Stack>
  );
}

export default CurrenciesScreen;