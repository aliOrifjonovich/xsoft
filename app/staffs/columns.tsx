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
import { JSX, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResponsiveModal } from "@/components/Modal";

export type Staff = {
  id: number;
  photo: string;
  fullname: string;
  dob: Date;
  gender: "Male" | "Female";
  phone: string;
  position: string;
  workingtype: "Full_time" | "Part_time" | "Contract";
  hireddate: Date;
  branch: string;
  salary: number;
  workStatus: "Active" | "Vacation" | "Fired";
};

const statusStyles: Record<
  Staff["workStatus"],
  { bg: string; icon: JSX.Element }
> = {
  Active: {
    bg: "bg-green-500 text-white",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  Vacation: {
    bg: "bg-yellow-500 text-white",
    icon: <Clock className="w-4 h-4" />,
  },
  Fired: {
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
  // {
  //   accessorKey: "photo",
  //   header: "Photo",
  //   cell: ({ row }) => (
  //     <Image
  //       src={row.original.photo}
  //       alt="Staff Photo"
  //       width={40}
  //       height={40}
  //       className="rounded-full object-cover"
  //     />
  //   ),
  // },
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => (
      <div className="text-black">{row.original.dob.toString()}</div>
    ),
  },
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
    cell: ({ row }) => new Date(row.original.hireddate).toString(),
  },
  {
    accessorKey: "workLocation",
    header: "Work Location",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.salary}</span>;
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
      const [open, setOpen] = useState(false);

      const handleDelete = async (id: number) => {
        const response = await fetch(
          `https://carmanagement-1-rmyc.onrender.com/api/v1/staffs/${id}/`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete client.");
        }
        console.log(`Client ${id} deleted successfully`);
        setOpen(false);
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
              <DropdownMenuItem
                onClick={() => console.log("Update:", staff.id)}
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" /> Update
              </DropdownMenuItem>
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
            title={`${staff.fullname} fillialini o'chirmoqchimisiz??`}
            description="Shu branchni o‘chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(staff.id)}
          />
        </>
      );
    },
  },
];
