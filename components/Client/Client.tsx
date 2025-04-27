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
import useSWR from "swr";
import Cookies from "js-cookie";

interface ClientProps {
  data?: ClientType[];
  url?: string;
}

const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

const Client: FC<ClientProps> = ({ data, url }) => {
  const { data: statistics } = useSWR(url, fetcher, {
    fallbackData: data,
    revalidateOnFocus: false,
  });

  console.log("Client statistics", statistics);

  const client_statistics = [
    {
      id: "1",
      title: "Umumiy Mijozlar soni",
      count: statistics?.total_clients,
      color: "text-primary",
    },
    {
      id: "2",
      title: "Doimiy Mijozlar",
      count: statistics?.active_clients,
      color: "text-green-500",
    },
    {
      id: "4",
      title: "Passiv mijozlar",
      count: statistics?.passive_clients,
      color: "text-gray-400",
    },
    {
      id: "3",
      title: "Qora ro'yxatdagi mijozlar",
      count: statistics?.blacklisted_clients,
      color: "text-red-500",
    },
  ];

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
          {client_statistics?.map((item, index) => (
            <Card
              key={index}
              className="w-1/4 flex flex-col gap-2 items-center justify-center "
            >
              <div className="flex flex-col gap-1">
                <h2 className={item.color + " font-semibold"}>{item.title}</h2>
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
        apiURL="client/"
        url="/clients/create-clients"
        buttonTitle="Mijoz Qo'shish"
      />
    </div>
  );
};

export default Client;
