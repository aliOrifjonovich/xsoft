"use client";

import * as React from "react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  useReactTable,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CombinedPagination } from "@/components/DataTablePaginationProps";
import { DataTableViewOptions } from "@/components/DataTableViewOptions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isReservation?: boolean;
  searchcolumns?: string | undefined;
  url?: string | undefined;
  buttonTitle?: string;
}
interface RentalData {
  pickup: { date: string };
  return: { date: string };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isReservation,
  searchcolumns,
  url,
  buttonTitle,
}: DataTableProps<TData, TValue>) {
  // const {
  //   data: swrData,
  //   error,
  //   isValidating,
  // } = useSWR(apiUrl, fetcher, {
  //   revalidateOnFocus: false,
  // });

  // const tableData = apiUrl ? swrData || [] : data || [];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const filteredData = React.useMemo(() => {
    if (!isReservation || !dateRange?.from || !dateRange?.to) return data;
    return data.filter((item) => {
      const rentalItem = item as RentalData;
      const pickupDate = parseISO(rentalItem.pickup.date);
      const returnDate = parseISO(rentalItem.return.date);
      return (
        isWithinInterval(pickupDate, {
          start: dateRange.from ?? new Date(),
          end: dateRange.to ?? new Date(),
        }) ||
        isWithinInterval(returnDate, {
          start: dateRange.from ?? new Date(),
          end: dateRange.to ?? new Date(),
        })
      );
    });
  }, [data, dateRange, isReservation]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, rowSelection },
  });

  return (
    <div>
      <div className="rounded-md border overflow-hidden w-full">
        <div className="flex justify-between items-center p-2 gap-4">
          <Input
            placeholder={`Search by ${searchcolumns ?? "default value"}`}
            value={
              (table
                .getColumn(`${searchcolumns}`)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(`${searchcolumns}`)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex flex-row gap-2">
            {isReservation && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-[300px] justify-start text-left font-normal rounded-md w-max",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            )}
            <DataTableViewOptions table={table} />

            <Link href={url ?? "#"}>
              <Button className="flex gap-2 cursor-pointer">
                <Plus />
                {buttonTitle}
              </Button>
            </Link>
          </div>
        </div>
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
      <CombinedPagination table={table} />
    </div>
  );
}
