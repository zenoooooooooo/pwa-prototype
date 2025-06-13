"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Archive, CheckIcon, Eye, Pencil, Plus } from "lucide-react";
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
import { IProject } from "@/interfaces/IProject";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function Projects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/fetch-project");
      const json = await res.json();
      setProjects(json.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const columns: ColumnDef<IProject>[] = [
    {
      accessorKey: "title",
      header: () => <div className="text-center">Projects</div>,
      cell: ({ row }) => (
        <div
          className={`text-center cursor-pointer ${
            selectedRowId === row.id ? "bg-accent text-white" : ""
          }`}
          onClick={() => {
            setSelectedRowId(row.id);
            console.log("Selected project id:", row.id);
          }}
        >
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "progress",
      header: () => <div className="text-center">Progress</div>,
      cell: ({ row }) => {
        const progress = Number(row.getValue("progress"));
        return (
          <div
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => {
              setSelectedRowId(row.id);
              console.log("Selected project id:", row.id);
            }}
          >
            <span className="text-sm font-medium mb-1">{progress}%</span>
            <Progress value={progress} className="w-full" />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row._id as string,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full col-span-full">
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center py-4">
          <Input
            placeholder="Filter projects..."
            className="max-w-sm border border-accent outline-none dark:bg-black dark:text-white dark:border-gray-700"
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="text-muted-foreground flex-1 text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
