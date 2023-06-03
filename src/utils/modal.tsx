import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';

interface Props{
  onConfirm: () => void;
}

export const deleteModal = {
  show: ({ onConfirm }: Props) => modals.openConfirmModal({
    title: 'Suppression',
    centered: true,
    children: (
      <Text size="sm">
        Êtes-vous sûr de vouloir supprimer les données? Cette action est destructrice et vous aurez
        contacter le support pour restaurer vos données.
      </Text>
    ),
    labels: { confirm: 'Supprimer', cancel: "Annuler" },
    confirmProps: { color: 'red' },
    onCancel: () => console.log('Cancel'),
    onConfirm: onConfirm,
  })
}