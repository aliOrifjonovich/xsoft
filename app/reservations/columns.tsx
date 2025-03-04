"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  Ban,
  Loader,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { JSX } from "react";

export type Rental = {
  id: string;
  pickup: string;
  return: string;
  carType: string;
  client: string;
  totalPrice: number;
  status: "Collected" | "Confirmed" | "Completed" | "Pending" | "No Show";
};

// Status Icons & Colors Mapping
const statusStyles: Record<
  Rental["status"],
  { bg: string; icon: JSX.Element }
> = {
  Confirmed: {
    bg: "bg-green-500 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Pending: {
    bg: "bg-yellow-500 text-white",
    icon: <Clock className="w-4 h-4" />,
  },
  Completed: {
    bg: "bg-black text-white",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Collected: {
    bg: "bg-blue-400 text-white",
    icon: <Loader className="w-4 h-4 animate-spin" />,
  },
  "No Show": { bg: "bg-red-500 text-white", icon: <Ban className="w-4 h-4" /> },
};

export const columns: ColumnDef<Rental>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pickup",
    header: "Pickup",
  },
  {
    accessorKey: "return",
    header: "Return",
  },
  {
    accessorKey: "carType",
    header: "Car Type",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "w-max px-3 py-1 rounded-sm text-xs font-bold uppercase flex items-center gap-2",
            statusStyles[status].bg
          )}
        >
          {statusStyles[status].icon}
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const rental = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("Update:", rental.id)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete:", rental.id)}
              className="flex items-center gap-2 text-red-500"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
