"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const Categories = () => {
  const router = useRouter();
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
              <BreadcrumbPage className="font-medium">
                Categoriyalar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          className="flex gap-2 cursor-pointer"
          onClick={() => {
            router.push("/clients/create-clients");
          }}
        >
          <Plus />
          Categoriya Qo&apos;shish
        </Button>
      </div>
      {/* <DataTable columns={columns} data={data || []} searchcolumns="name" /> */}
    </div>
  );
};

export default Categories;
