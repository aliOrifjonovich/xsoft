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
import React, { JSX } from "react";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import Link from "next/link";
import { mutate } from "swr";
import Cookies from "js-cookie";
import { BASE_URL } from "@/components/data-table";

export type ClientType = {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  age: number;
  passportid: string;
  driverLicense: string;
  licenseExpiry: Date;
  status: "Active" | "Blacklisted" | "InActive";
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
  InActive: {
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
    accessorKey: "fullname",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.fullname}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-black">{row.original.phone_number}</div>
    ),
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "passportid",
    header: "National ID",
    cell: ({ row }) => (
      <div className="text-black">{row.original.passportid}</div>
    ),
  },
  {
    accessorKey: "driverLicense",
    header: "Driver License",
  },
  {
    accessorKey: "licenseExpiry",
    header: "License Expiry",
    cell: ({ row }) => (
      <div className="text-black">{row.original.licenseExpiry.toString()}</div>
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
            statusStyles[status]?.bg
          )}
        >
          {statusStyles[status]?.icon}
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
      const [open, setOpen] = React.useState(false);
      const [loading, setLoading] = React.useState(false);

      const handleDelete = async (id: number) => {
        setLoading(true);
        const token = Cookies.get("token");

        const response = await fetch(
          `https://carmanagement-1-rmyc.onrender.com/api/v1/client/${id}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          await mutate(`${BASE_URL}client/`, undefined, {
            revalidate: true,
          });
        } else {
          console.error("Failed to delete category");
        }
        setLoading(false);
        setOpen(false);
        // window.location.reload();
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/clients/create-clients?id=${client.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                }}
                className="flex items-center gap-2 text-red-500"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ResponsiveModal
            open={open}
            setOpen={setOpen}
            loading={loading}
            title={`${client.fullname} fillialini o'chirmoqchimisiz??`}
            description="Shu branchni o‘chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(client.id)}
          />
        </>
      );
    },
  },
];
