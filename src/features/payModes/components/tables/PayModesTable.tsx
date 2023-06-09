import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IPayMode } from "../../types";
import { Anchor } from '@mantine/core';
import { usePayModes } from "../../hooks/payModes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (payModes: IPayMode[]) => void;
  onEdit?: (payMode: IPayMode) => void;
}

function PayModesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = usePayModes({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IPayMode>[]>(
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
        header: "Description",
        cell: (row) => row.renderValue(),
        accessorKey: "description",
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
        isEditable={permissionsChecker(Routes.payModes)?.canUpdate}
      />
    </>
  );
}

export default PayModesTable;