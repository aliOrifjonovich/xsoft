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
import { columns, Staff } from "@/app/staffs/columns";
import { Card } from "../ui/card";
// import { useUser } from "@/providers/UserProvider";
// import { useRouter } from "next/navigation";
<<<<<<< HEAD
import Cookies from "js-cookie";
import useSWR from "swr";

interface UserProps {
  data?: Staff[];
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

const Staffs: FC<UserProps> = ({ data, url }) => {
  const { data: statistics } = useSWR(url, fetcher, {
    fallbackData: data,
    revalidateOnFocus: false,
  });

  const staff_statistics = [
    {
      id: "1",
      title: "Umumiy Xodimlar Soni",
      count: statistics?.total_staffs,
      color: "text-primary",
    },
    {
      id: "2",
      title: "Umumiy Oyliklar",
      count: statistics?.total_salary,
      color: "text-red-400",
    },
    {
      id: "4",
      title: "Ishlayotgan Xodimlar",
      count: statistics?.active_staffs,
      color: "text-green-500",
    },
    {
      id: "3",
      title: "Ta'tildagi Xodimlar",
      count: statistics?.staffs_on_vacation,
      color: "text-yellow-500",
    },
  ];

  console.log("Client statistics", statistics);
=======

interface UserProps {
  data?: Staff[];
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
    title: "Umumiy Oyliklar",
    count: "20,000,000 sum",
    color: "text-primary",
  },
  {
    id: "4",
    title: "Ishlayotgan Xodimlar",
    count: 5,
    color: "text-green-500",
  },
  {
    id: "3",
    title: "Ta'tildagi Xodimlar",
    count: 3,
    color: "text-yellow-500",
  },
];

const Staffs: FC<UserProps> = ({ data }) => {
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
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
              <BreadcrumbPage className="font-medium">Xodimlar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex w-full gap-4">
<<<<<<< HEAD
          {staff_statistics?.map((item, index) => (
            <Card
              key={index}
              className="w-1/4 flex flex-col gap-2 items-center justify-center "
            >
              <div className="flex flex-col gap-1 text-center">
                <h2 className={item.color + " font-semibold"}>{item.title}</h2>
=======
          {fakedata?.map((item) => (
            <Card
              key={item.id}
              className="w-1/4 flex flex-col gap-2 items-center justify-center "
            >
              <div className="flex flex-col gap-1 text-center">
                <h2 className=" text-gray-500">{item.title}</h2>
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
                <h1
                  className={item.color + " font-semibold text-3xl text-center"}
                >
                  {item.count}
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
        apiURL="employee/"
        url="/staffs/create-staffs"
        buttonTitle="Xodim Qo'shish"
      />
    </div>
  );
};

export default Staffs;
