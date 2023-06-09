import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Table } from "../../../../components/tables/Table";
import { filterFns } from "../../../../components/tables/filterFns";
import { ICity } from "../../types";
import { Badge, Anchor } from '@mantine/core';
import { useCities } from "../../hooks/roles";
import { Routes } from "../../../../navigation/routes";
import { useFeaturePermissions } from "../../../accessControl/hooks/permissions";

interface Props{
  filters: {
    keyword?: string;
  };
  onSelect?: (cities: ICity[]) => void;
  onEdit?: (city: ICity) => void;
}

function CitiesTable({ filters, onSelect, onEdit }: Props){

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { keyword } = filters;

  const dataQuery = useCities({
    page: currentPage,
    per_page: 10,
    field: "name",
    keyword: keyword,
  });

  const { meta, data, isLoading, isFetching, errorResponse } = dataQuery;

  const permissionsChecker = useFeaturePermissions();

  const cols = React.useMemo<ColumnDef<ICity>[]>(
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
        isEditable={permissionsChecker(Routes.cities)?.canUpdate}
      />
    </>
  );
}

export default CitiesTable;