"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { ResponsiveModal } from "@/components/ResponsiveModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type BranchesType = {
  id: number;
  name: string;
  address: string;
  year_of_construction: Date;
  total_area: number;
  google_map_link: string;
  yandex_map_link: string;
};

export const columns: ColumnDef<BranchesType>[] = [
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
    header: "Branch Nomi",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.address}</div>
    ),
  },
  {
    accessorKey: "year_of_construction",
    header: "Year of Construction",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.year_of_construction.toString()}
      </div>
    ),
  },

  {
    accessorKey: "total_area",
    header: "Total Area",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.total_area}</div>
    ),
  },
  {
    accessorKey: "google_map_link",
    header: "Google Map Link",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.google_map_link}
      </div>
    ),
  },
  {
    accessorKey: "yandex_map_link",
    header: "Yandex Map Link",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.original.yandex_map_link}
      </div>
    ),
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
      const branch = row.original;
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const handleDelete = async (id: number) => {
        setLoading(true);
        // const token = Cookies.get("token");

        const response = await fetch(
          `https://carmanagement-1-rmyc.onrender.com/api/v1/branchs/${id}/`,
          {
            method: "DELETE",
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        if (response.ok) {
          // mutate();
          console.log("hello");
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
              <Link href={`/branch/create-branch?id=${branch.id}`}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" /> Update
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(true);
                }}
                className="flex items-center gap-2 text-red-500"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <span>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ResponsiveModal
            open={open}
            setOpen={setOpen}
            loading={loading}
            title={`${branch.name} fillialini o'chirmoqchimisiz??`}
            description="Shu branchni o‘chirishni tasdiqlaysizmi?"
            onConfirm={() => handleDelete(branch.id)}
          />
        </>
      );
    },
  },
];
