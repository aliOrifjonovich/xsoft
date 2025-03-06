"use client";

import React, { FC } from "react";
import { DataTable } from "../data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { columns, Staff } from "@/app/users/columns";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface UserProps {
  data?: Staff[];
}
const User: FC<UserProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">Xodimlar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="flex gap-2 cursor-pointer">
          <Plus />
          Xodim Qo&apos;shish
        </Button>
      </div>
      <DataTable columns={columns} data={data || []} searchcolumns="fullname" />
    </div>
  );
};

export default User;
