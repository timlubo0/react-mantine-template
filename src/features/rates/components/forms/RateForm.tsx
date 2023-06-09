import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { Button, Box, Group, NumberInput, Select, ActionIcon, Loader, NativeSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IRate } from '../../types';
import { useCurrencies } from '../../../currencies/hooks/currencies';
import { useSelectMemo } from '../../../../hooks/useSelectMemo';
import { IconCirclePlus } from '@tabler/icons-react';
import CurrencyFormModal from '../../../currencies/components/modals/CurrencyFormModal';

interface Props{
  onSubmit: (data: IRate) => void;
  isLoading: boolean;
  rate?: IRate;
}

function RateForm({ onSubmit, isLoading, rate }: Props) {

  const currencyFormModal = useDisclosure();

  const schema = z.object({
    currencyId: z.string(),
    currencyToId: z.string(),
    amount: z.number(),
  });

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      currencyId: rate?.currency?.id || '',
      currencyToId: rate?.currencyTo?.id || '',
      amount: rate?.amount || 0,
    },
  });

  const currenciesQuery = useCurrencies({ page: 1, per_page: 100 });
  const currencies = useSelectMemo({
    key: "id",
    value: "name",
    data: currenciesQuery.data,
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Group grow>
          <NativeSelect
            withAsterisk
            label="Devise d'origine"
            placeholder="Choisissez une devise"
            data={currencies}
            {...form.getInputProps("currencyId")}
            rightSection={
              <ActionIcon onClick={() => currencyFormModal[1].open()}>
                {!currenciesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {currenciesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
          <NativeSelect
            withAsterisk
            label="Devise de destination"
            placeholder="Choisissez une devise"
            data={currencies}
            {...form.getInputProps("currencyToId")}
            rightSection={
              <ActionIcon onClick={() => currencyFormModal[1].open()}>
                {!currenciesQuery.isLoading && (
                  <IconCirclePlus size={"1.45rem"} />
                )}
                {currenciesQuery.isLoading && <Loader size={"xs"} />}
              </ActionIcon>
            }
          />
        </Group>
        <NumberInput
          withAsterisk
          label="Taux de change"
          placeholder="Taux de change..."
          type="number"
          {...form.getInputProps("amount")}
        />
        <Group mt="xl" position="right">
          <Button mt="xl" size="sm" type="submit" loading={isLoading}>
            Enregistrer
          </Button>
        </Group>
      </form>
      <CurrencyFormModal
        opened={currencyFormModal[0]}
        onClose={() => currencyFormModal[1].close()}
        centered={false}
      />
    </Box>
  );
}

export default RateForm;