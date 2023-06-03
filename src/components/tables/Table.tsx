import React, { useState, useEffect } from 'react';
import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { filterFns } from './filterFns';
import { DebouncedInput } from './DebouncedInput';
import Pagination from './Pagination';
import { createStyles, Table as CTable, Checkbox, ScrollArea, rem, ActionIcon, Center, Loader, LoadingOverlay, Alert, Button, Flex, Text } from '@mantine/core';
import { IconPencil, IconAlertCircle } from '@tabler/icons-react';

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  isLoading?: boolean;
  isFetching?: boolean;
  meta: {
    currentPage: number;
    pageSize: number;
    total: number;
  }
  onPageChange: (page: number) => void;
  isEditable?: boolean;
  isSelectable?: boolean;
  onSelect?: (rows: any) => void;
  onEdit?: (row: any) => void;
  error?: boolean;
}

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export const Table = <T extends object>({
  data,
  columns,
  showNavigation = true,
  showGlobalFilter = false,
  filterFn = filterFns.fuzzy,
  isLoading = false,
  isFetching = false,
  meta,
  onPageChange,
  isEditable = true,
  isSelectable = true,
  onEdit,
  onSelect,
  error = false
}: ReactTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFn,
    pageCount: Math.ceil(meta.total / meta.pageSize),
    manualPagination: true
  });

  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<Array<any>>([]);
  const [selectedRows, setSelectedRows] = useState<Array<string>>(['']);

  const toggleRow = (value: any) => {
    setSelection((current) =>
      selectedRows.includes(value?.index)
          ? current.filter((item) => item?.index !== value?.index)
          : [...current, value]
    );
    setSelectedRows((current) =>
      current.includes(value?.index)
        ? current.filter((item) => item !== value?.index)
        : [...current, value?.index]
    );
  }
    
  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length
        ? []
        : table.getRowModel().rows.map((item) => ({...item.original, ...{ index: item.id }}))
    );
    setSelectedRows((current) =>
      current.length === data.length
        ? []
        : table.getRowModel().rows.map((item) => item.id)
    );
  }

  useEffect(() => {
    onSelect?.(selection);
  }, [selectedRows])
    
  const rows = table.getRowModel().rows.map((row) => {
    const selected = selection.includes(row.id);
    return (
      <tr key={row.id} className={cx({ [classes.rowSelected]: selected })}>
        {isSelectable && (
          <td>
            <Checkbox
              checked={selectedRows.includes(row.id)}
              onChange={() =>
                toggleRow({ ...row.original, ...{ index: row.id } })
              }
              transitionDuration={0}
            />
          </td>
        )}
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
        {isEditable && (
          <td>
            <ActionIcon onClick={() => onEdit?.(row.original) } variant="outline">
              <IconPencil size={"1.25rem"} />
            </ActionIcon>
          </td>
        )}
      </tr>
    );
  });

  return (
    <>
      {!error && (
        <ScrollArea m={2}>
          {showGlobalFilter ? (
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="font-lg border-block border p-2 shadow mb-2"
              placeholder="Search all columns..."
            />
          ) : null}
          {isFetching && <LoadingOverlay visible={true} overlayBlur={1} />}
          <CTable w={"100%"} verticalSpacing="sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {isSelectable && (
                    <th style={{ width: rem(40) }}>
                      <Checkbox
                        onChange={toggleAll}
                        checked={selection.length === data.length}
                        indeterminate={
                          selection.length > 0 &&
                          selection.length !== data.length
                        }
                        transitionDuration={0}
                      />
                    </th>
                  )}
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-sm font-medium text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                  {isEditable && <th></th>}
                </tr>
              ))}
            </thead>
            {!isLoading && <tbody>{rows}</tbody>}
          </CTable>
          {showNavigation && !isLoading ? (
            <Pagination table={table} onPageChange={onPageChange} />
          ) : null}
          {isLoading && (
            <Center>
              <Loader size={"lg"} />
            </Center>
          )}
        </ScrollArea>
      )}
      {error && (
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Erreur reseau!"
          color="red"
        >
          <Flex justify={'space-between'}>
            <Text>Votre ordinateur semble n'est pas avoir une connexion internet!</Text>
            <Button onClick={() => window.location.reload()} size='xs'>Actualiser</Button>
          </Flex>
        </Alert>
      )}
    </>
  );
};
