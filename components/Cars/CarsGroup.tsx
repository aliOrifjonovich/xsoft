"use client";
import React, { FC } from "react";
import Cookies from "js-cookie";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import CarsTable from "../carstable";
import { Vehicle } from "@/app/cars/page";
import { Card } from "../ui/card";
import useSWR from "swr";
import { stat } from "fs";

interface CarsGroupProps {
  data?: Vehicle[];
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

const CarsGroup: FC<CarsGroupProps> = ({ data, url }) => {
  const { data: statistics } = useSWR(url, fetcher, {
    fallbackData: data,
    revalidateOnFocus: false,
  });

  const cars_statistics = [
    {
      title: "Avtomobillar soni",
      count: statistics?.total_cars,
      color: "text-primary",
    },
    {
      title: "Bo'sh avtomobillar",
      count: statistics?.free_cars,
      color: "text-green-500",
    },
    {
      title: "Ijaradagi avtomobillar",
      count: statistics?.on_rent_cars,
      color: "text-red-500",
    },
    {
      id: "4",
      title: "Reserv qilinganlar",
      count: statistics?.reserved_cars,
      color: "text-amber-500",
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
              <BreadcrumbPage className="font-medium">
                Avtomobillar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex w-full gap-4">
          {cars_statistics?.map((item, index) => (
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
      <CarsTable
        data={data || []}
        buttonTitle={"Avtomobil qo'shish"}
        apiURL="cars/"
      />
    </div>
  );
};

export default CarsGroup;
