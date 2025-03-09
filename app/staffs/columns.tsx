"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CheckCircle,
  Clock,
  Ban,
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { JSX } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export type Staff = {
  id: string;
  photo: string;
  fullname: string;
  dob: string;
  gender: "Male" | "Female";
  phone: string;
  position: string;
  employmentType: "Full-time" | "Part-time" | "Contract";
  hireDate: string;
  workLocation: string;
  salary: number;
  workStatus: "Active" | "Ta'tilda" | "Bo'shagan";
};

const statusStyles: Record<
  Staff["workStatus"],
  { bg: string; icon: JSX.Element }
> = {
  Active: {
    bg: "bg-green-500 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  "Ta'tilda": {
    bg: "bg-yellow-500 text-white",
    icon: <Clock className="w-4 h-4" />,
  },
  "Bo'shagan": {
    bg: "bg-red-500 text-white",
    icon: <Ban className="w-4 h-4" />,
  },
};

export const columns: ColumnDef<Staff>[] = [
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
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <Image
        src={row.original.photo}
        alt="Staff Photo"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    ),
  },
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  // {
  //   accessorKey: "dob",
  //   header: "Date of Birth",
  //   cell: ({ row }) => new Date(row.original.dob).toLocaleDateString("en-GB"),
  // },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "employmentType",
    header: "Employment Type",
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) =>
      new Date(row.original.hireDate).toLocaleDateString("en-GB"),
  },
  {
    accessorKey: "workLocation",
    header: "Work Location",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.salary);
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "workStatus",
    header: "Work Status",
    cell: ({ row }) => {
      const status = row.original.workStatus;
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
      const staff = row.original;
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
              onClick={() => console.log("Update:", staff.id)}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log("Delete:", staff.id)}
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
