import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { ICurrency } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useCurrencies } from "../../hooks/currencies";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (currencies: ICurrency[]) => void;
  onEdit?: (currency: ICurrency) => void;
}

function CurrenciesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useCurrencies({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<ICurrency>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "name",
      },
      {
        header: "Slug",
        cell: (row) => (
          <Badge
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="span"
            tt={"lowercase"}
          >{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "slug",
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
        isEditable={permissionsChecker(Routes.currencies)?.canUpdate}
      />
    </>
  );
}

export default CurrenciesTable;