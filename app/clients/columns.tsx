"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, CheckCircle, Ban } from "lucide-react";
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

export type ClientType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nationalId: string;
  driverLicense: string;
  licenseExpiry: string;
  status: "Active" | "Blacklisted" | "Inactive";
};

// Status Styles Mapping
const statusStyles: Record<
  ClientType["status"],
  { bg: string; icon: JSX.Element }
> = {
  Active: {
    bg: "bg-green-500 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Blacklisted: {
    bg: "bg-red-500 text-white",
    icon: <Ban className="w-4 h-4" />,
  },
  Inactive: {
    bg: "bg-gray-400 text-white",
    icon: <Ban className="w-4 h-4" />,
  },
};

export const columns: ColumnDef<ClientType>[] = [
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
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "nationalId",
    header: "National ID",
  },
  {
    accessorKey: "driverLicense",
    header: "Driver License",
  },
  {
    accessorKey: "licenseExpiry",
    header: "License Expiry",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {new Date(row.original.licenseExpiry).toLocaleDateString("en-GB")}
      </div>
    ),
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
      const client = row.original;
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
              onClick={() => console.log("Update:", client.id)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete:", client.id)}
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
