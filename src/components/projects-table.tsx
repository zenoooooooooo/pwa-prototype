"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Archive, Eye, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import { useState } from "react";
import { Button } from "./ui/button";
import CreateProject from "./create-project-form";

type ProjectsProps = {
  onSelectProject: (id: string) => void;
  projects: IProject[] | [];
  isLoading: boolean;
};

export function Projects({
  onSelectProject,
  projects,
  isLoading,
}: ProjectsProps) {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onSelectProject(row.id);
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
              onSelectProject(row.id);
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
    <>
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

          <div className="flex justify-end items-center gap-2 w-1/2 ">
            <Button
              variant="ghost"
              className="hover:cursor-pointer active:opacity-50 transition-all duration-100"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="hover:cursor-pointer active:opacity-50 transition-all duration-100"
            >
              <Eye className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="hover:cursor-pointer active:opacity-50 transition-all duration-100"
            >
              <Archive className="h-5 w-5" />
            </Button>
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
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="blur-me fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-lg p-6"
            >
              <div className="mb-5 flex w-full items-center justify-between">
                <p className="text-xl font-semibold text-white">
                  Create Project
                </p>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600/40 outline-none transition-all duration-200 ease-in-out hover:bg-zinc-600/30"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
              </div>
              <CreateProject />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
