import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IRate } from "../../types";
import { Anchor, Badge } from '@mantine/core';
import { useRates } from "../../hooks/payModes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (rates: IRate[]) => void;
  onEdit?: (rate: IRate) => void;
}

function RatesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useRates({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IRate>[]>(
    () => [
      {
        header: "Devise d'origine",
        cell: (cell) => (
          <Anchor component="span" fz="sm">
            {`${cell.row.original.currency?.name}`}
          </Anchor>
        ),
        accessorKey: "currency",
      },
      {
        header: "Devise d'origine",
        cell: (cell) => (
          <Anchor component="span" fz="sm">
            {`${cell.row.original.currencyTo?.name}`}
          </Anchor>
        ),
        accessorKey: "currencyTo",
      },
      {
        header: "Taux de change",
        cell: (cell) => (<Badge>{`${cell.row.original.currency?.name} ${cell.renderValue()}`}</Badge>),
        accessorKey: "amount",
      },
    ],
    []
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  return (
    <>
      <Table
        columns={cols}
        data={data || []}
        meta={{
          currentPage: meta?.current_page,
          pageSize: meta?.per_page,
          total: meta?.total,
        }}
        filterFn={filterFns.contains}
        isLoading={isLoading}
        isFetching={isFetching}
        onPageChange={handlePageChange}
        onEdit={onEdit}
        onSelect={onSelect}
        error={errorResponse}
        isEditable={permissionsChecker(Routes.rates)?.canUpdate}
      />
    </>
  );
}

export default RatesTable;