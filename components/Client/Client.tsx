"use client";
import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { DataTable } from "../data-table";
import { ClientType, columns } from "@/app/clients/columns";
import { Card } from "../ui/card";

interface ClientProps {
  data?: ClientType[];
}
const fakedata = [
  {
    id: "1",
    title: "Umumiy Mijozlar soni",
    count: 10,
    color: "text-primary",
  },
  {
    id: "2",
    title: "Doimiy Mijozlar",
    count: 2,
    color: "text-green-500",
  },
  {
    id: "4",
    title: "Passiv mijozlar",
    count: 5,
    color: "text-gray-400",
  },
  {
    id: "3",
    title: "Qora ro'yxatdagi mijozlar",
    count: 3,
    color: "text-red-500",
  },
];
const Client: FC<ClientProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <div className="flex flex-col w-full  gap-4">
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

        <div className="flex w-full gap-4">
          {fakedata?.map((item) => (
            <Card
              key={item.id}
              className="w-1/4 flex flex-col gap-2 items-center justify-center "
            >
              <div className="flex flex-col gap-1">
                <h2 className=" text-gray-500">{item.title}</h2>
                <h1
                  className={item.color + " font-semibold text-3xl text-center"}
                >
                  {item.count} ta
                </h1>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        searchcolumns="fullname"
        url="/clients/create-clients"
        buttonTitle="Mijoz Qo'shish"
      />
    </div>
  );
};

export default Client;
