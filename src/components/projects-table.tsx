"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Archive, Eye, Pencil, Plus } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProject } from "@/interfaces/Project";



export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: "project",
    header: () => <div className="text-center">Projects</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("project")}</div>,
  },
  {
    accessorKey: "progress",
    header: () => <div className="w-3/4 text-center">Progress</div>,
    cell: ({ row }) => {
      const progress = Number(row.getValue("progress"));
      return (
        <div className="flex flex-col justify-center items-center w-3/4">
          <span className="text-sm font-medium mb-1">{progress}%</span>
          <Progress value={progress} className="w-full" />
        </div>
      );
    },
  },
];

export function Projects() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full col-span-full">
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center py-4">
          <Input
            placeholder="Filter projects..."
            value={
              (table.getColumn("project")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("project")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border border-accent outline-none dark:bg-black dark:text-white dark:border-gray-700"
          />
        </div>

        <div className="flex justify-end items-center gap-4 w-1/2 ">
          <Link href="#">
            <Plus className="h-5 w-5" />
          </Link>
          <Link href="#">
            <Eye className="h-5 w-5" />
          </Link>
          <Link href="#">
            <Pencil className="h-5 w-5" />
          </Link>
          <Link href="#">
            <Archive className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
