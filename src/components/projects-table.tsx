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
import { Archive, ArrowUpDown, Eye, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export type Project = {
  id: string;
  project: string;
  progress: number;
  status: "pending" | "processing" | "success" | "failed";
};

const data: Project[] = [
  {
    id: "proj1",
    project: "Portfolio Website",
    progress: 85,
    status: "success",
  },
  {
    id: "proj2",
    project: "E-Commerce App",
    progress: 42,
    status: "processing",
  },
  {
    id: "proj3",
    project: "Blog CMS",
    progress: 60,
    status: "processing",
  },
  {
    id: "proj4",
    project: "Task Manager CLI",
    progress: 100,
    status: "success",
  },
  {
    id: "proj5",
    project: "Real-Time Chat App",
    progress: 30,
    status: "pending",
  },
];

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "project",
    header: () => <div className="text-center w-1/3">Projects</div>,
    cell: ({ row }) => (
      <div className="capitalize w-1/3">{row.getValue("project")}</div>
    ),
  },
  {
    accessorKey: "progress",
    header: () => <div className="text-center w-1/3">Progress</div>,
    cell: ({ row }) => {
      const progress = Number(row.getValue("progress"));
      return (
        <div className="flex flex-col items-center w-1/3">
          <span className="text-sm font-medium mb-1">{progress}%</span>
          <Progress value={progress} className="w-full" />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center w-1/3">Actions</div>,
    cell: () => (
      <div className="flex justify-center items-center gap-4 w-1/3">
        <Link href="#"  >
          <Eye className="h-4 w-4" />
        </Link>
        <Link href="#"  >
          <Pencil className="h-4 w-4" />
        </Link>
        <Link href="#"  >
          <Archive className="h-4 w-4" />
        </Link>
      </div>
    ),
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

        <Link
          href="#"
          className="text-white flex items-center justify-center gap-2 p-2
          bg-accent font-semibold rounded-[8px] transition-all duration-100
          dark:bg-white dark:text-black hover:opacity-80"
        >
          <Plus /> Create Project
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
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
