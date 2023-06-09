import { useState } from "react";
import { Stack } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import CrudHeader from "../../../components/CrudHeader";
import { IPayMode } from "../types";
import { IconTrash } from '@tabler/icons-react';
import { CrudActionProps } from "../../../components/CrudActionButtons";
import PayModesTable from "../components/tables/PayModesTable";
import PayModeFormModal from "../components/modals/PayModeFormModal";
import { deleteModal } from "../../../utils/modal";
import { usePayModeDelete } from "../hooks/payModes";
import { toast } from "../../../utils/toast";

function PayModesScreen(){

  const payModeFormModal = useDisclosure(false);
  const [payMode, setPayMode] = useState<IPayMode>();
  const [selectedPayModes, setSelectedPayModes] = useState<IPayMode[]>([]);
  const [showActions, setShowActions] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();

  const deleteMutation = usePayModeDelete({
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
            selectedPayModes.map((payMode) => deleteMutation.mutate(`${payMode.uid}`));
          },
        }),
    },
  ];

  const handleSelection = (payModes: IPayMode[]) => {
    payModes.length > 0 ? setShowActions(true) : setShowActions(false);
    setSelectedPayModes(payModes);
  }

  const handleEdit = (payMode: IPayMode) => {
    setPayMode(payMode);
    payModeFormModal[1].open();
  }

  const handleAdd = () => {
    setPayMode(undefined);
    payModeFormModal[1].open();
  }
  
  return (
    <Stack>
      <CrudHeader
        onButtonClick={handleAdd}
        buttonTitle="Nouveau mode de paiement"
        actions={crudActions}
        showActions={showActions}
        onSearch={(keyword) => setKeyword(keyword)}
      />
      <PayModesTable onEdit={handleEdit} onSelect={handleSelection} filters={{keyword: keyword}} />
      <PayModeFormModal
        opened={payModeFormModal[0]}
        onClose={payModeFormModal[1].close}
        payMode={payMode}
      />
    </Stack>
  );
}

export default PayModesScreen;