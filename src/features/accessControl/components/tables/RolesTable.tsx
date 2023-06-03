import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IRole } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useRoles } from "../../hooks/roles";

interface Props{
  filters?: {
  };
  onSelect?: (roles: IRole[]) => void;
  onEdit?: (role: IRole) => void;
}

function RolesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);

  const rolesQuery = useRoles({ page: currentPage, per_page: 10 });

  const { meta, data, isLoading, isFetching, errorResponse } = rolesQuery;

  const cols = React.useMemo<ColumnDef<IRole>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => <Anchor component="span" fz="sm">{`${row.renderValue()}`}</Anchor>,
        accessorKey: "name",
      },
      {
        header: "Slug",
        cell: (row) => (
          <Badge
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="span"
            tt={'lowercase'}
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
      />
    </>
  );
}

export default RolesTable;