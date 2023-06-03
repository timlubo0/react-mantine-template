import { Table } from "@tanstack/react-table";
import { Box, Button, Flex, Text, Select, ActionIcon } from "@mantine/core";
import {
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

interface Props<T extends object>{
  table: Table<T>;
  onPageChange: (page: number) => void
}

function Pagination<T extends object>({ table, onPageChange }: Props<T>){

  return (
    <Box py={5} px={2}>
      <Flex gap={2}>
        <ActionIcon
          className="cursor-pointer rounded border p-1"
          onClick={() => {
            onPageChange(1);
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronsLeft size="1.125rem" />
        </ActionIcon>
        {/* <ActionIcon
          className="cursor-pointer rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="left"
        >
          <IconChevronLeft size="1.125rem" />
        </ActionIcon> */}
        {[...Array(table.getPageCount())].map((page, index) => (
          <Button
            onClick={() => {
              table.setPageIndex(index);
              onPageChange(index + 1);
            }}
            bg={table.getState().pagination.pageIndex === index ? "blue" : "gray"}
            key={index + 1}
          >
            {index + 1}
          </Button>
        ))}
        {/* <ActionIcon
          className="cursor-pointer rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="left"
        >
          <IconChevronRight size="1.125rem" />
        </ActionIcon> */}
        <ActionIcon
          className="cursor-pointer rounded border p-1"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            onPageChange(table.getPageCount());
          }}
          disabled={!table.getCanNextPage()}
          aria-label="left"
        >
          <IconChevronsRight size="1.125rem" />
        </ActionIcon>
        {/* <Flex align={"center"} gap={1}>
          <Text>Page</Text>
          <Text fw={"bold"}>
            {table.getState().pagination.pageIndex + 1} sur{" "}
            {table.getPageCount()}
          </Text>
        </Flex> */}

        {/* <Box>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
            data={['10', '20', '30', '40', '50']}
          />
        </Box> */}
      </Flex>
    </Box>
  );
}

export default Pagination;