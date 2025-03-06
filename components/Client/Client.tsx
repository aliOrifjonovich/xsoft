import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "../data-table";
import { ClientType, columns } from "@/app/clients/columns";

interface ClientProps {
  data?: ClientType[];
}
const Client: FC<ClientProps> = ({ data }) => {
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
              <BreadcrumbPage className="font-medium">Mijozlar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="flex gap-2 cursor-pointer">
          <Plus />
          Mijoz Qo&apos;shish
        </Button>
      </div>
      <DataTable columns={columns} data={data || []} searchcolumns="name" />
    </div>
  );
};

export default Client;
