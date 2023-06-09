import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { IRole } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useRoles } from "../../hooks/roles";
import { Link } from "react-router-dom";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (roles: IRole[]) => void;
  onEdit?: (role: IRole) => void;
}

function RolesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const rolesQuery = useRoles({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = rolesQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<IRole>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => (
          <Anchor component="span" fz="sm">
            <Link to={`${Routes.roles}/${row.row.original.uid}${Routes.permissions}`}>{`${row.renderValue()}`}</Link>
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
        isEditable={permissionsChecker(Routes.roles)?.canUpdate}
      />
    </>
  );
}

export default RolesTable;