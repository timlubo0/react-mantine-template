import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IUSerPayMode } from "../../types";
import { Anchor, Badge } from '@mantine/core';
import { useUserPayModes } from "../../hooks/userPayModes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";
import { Routes } from "../../../../navigation/routes";

interface Props{
  filters: {
    keyword?: string;
    userId?: string;
  };
  onSelect?: (userPayModes: IUSerPayMode[]) => void;
  onEdit?: (userPayModes: IUSerPayMode) => void;
}

function UserPayModesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword, userId } = filters;

  const dataQuery = useUserPayModes({
    page: currentPage,
    per_page: 10,
    field: "number",
    keyword: keyword,
    key: 'user_id',
    value: userId
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IUSerPayMode>[]>(
    () => [
      {
        header: "Utilisateur",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            {`${row.renderValue()}`}
          </Anchor>
        ),
        accessorKey: "user.name",
      },
      {
        header: "Mode de paiement",
        cell: (row) => (<Badge>{`${row.renderValue()}`}</Badge>),
        accessorKey: "pay_mode.name",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "number",
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

export default UserPayModesTable;