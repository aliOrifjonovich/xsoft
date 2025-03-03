"use client";

import { columns, Payment } from "@/app/users/columns";
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

interface UserProps {
  data?: Payment[];
}
const User: FC<UserProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
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
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default User;
