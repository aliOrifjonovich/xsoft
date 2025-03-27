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
// import Image from "next/image";
import React, { JSX } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import Link from "next/link";
import { mutate } from "swr";
import { BASE_URL } from "@/components/data-table";
import { toast } from "sonner";
import Cookies from "js-cookie";

export type Staff = {
  id: number;
  photo: string;
  fullname: string;
  dob: Date;
  gender: "Male" | "Female";
  phone_number: string;
  position: string;
  employmentType: "Full_time" | "Part_time" | "Contract";
  hireDate: Date;
  branch: {
    id: number;
    name: string;
  };
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

const ActionsCell = ({ row }: { row: { original: Staff } }) => {
  const staff = row.original;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const token = Cookies.get("token");

    try {
      const response = await fetch(
        `https://carmanagement-1-rmyc.onrender.com/api/v1/employee/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await mutate(`${BASE_URL}employee/`, undefined, {
          revalidate: true,
        });
        toast.success("Staff deleted successfully", {
          position: "top-right",
          closeButton: true,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
          <Link href={`/staffs/create-staffs?id=${staff.id}`}>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Pencil className="h-4 w-4" /> Update
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-red-500 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResponsiveModal
        open={open}
        setOpen={setOpen}
        loading={loading}
        title={`${staff.fullname} fillialini o'chirmoqchimisiz??`}
        description="Shu branchni o‘chirishni tasdiqlaysizmi?"
        onConfirm={() => handleDelete(staff.id)}
      />
    </>
  );
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
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-black">{row.original.phone_number}</div>
    ),
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "employmentType",
    header: "Ish shakli",
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => row.original.hireDate.toString(),
  },
  {
    accessorKey: "workLocation",
    header: "Work Location",
    cell: ({ row }) => row.original.branch.name,
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
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];
