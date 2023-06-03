import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IUser } from "../../types";
import { useUsers } from "../../hooks/users";
import { Badge, Anchor } from '@mantine/core';

interface Props{
  filters?: {
  };
  onSelect?: (users: IUser[]) => void;
  onEdit?: (user: IUser) => void;
}

function UsersTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);

  const usersQuery = useUsers({ page: currentPage, per_page: 10 });

  const { meta, data, isLoading, isFetching, errorResponse } = usersQuery;

  const cols = React.useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => <Anchor component="span" fz="sm">{`${row.renderValue()}`}</Anchor>,
        accessorKey: "name",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
      {
        header: "Role",
        cell: (row) => (
          <Badge
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="span"
            tt={'lowercase'}
          >{`${row.renderValue()}`}</Badge>
        ),
        accessorKey: "role.name",
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
      />
    </>
  );
}

export default UsersTable;