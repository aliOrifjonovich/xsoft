<<<<<<< HEAD
"use client";
=======
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
import { BranchesType, columns } from "@/app/branch/columns";
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
<<<<<<< HEAD
import { YMaps, Map } from "@pbe/react-yandex-maps";
=======
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
interface BranchesProp {
  data?: BranchesType[];
}
const Branches: FC<BranchesProp> = ({ data }) => {
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
              <BreadcrumbPage className="font-medium">Filiallar</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* <div className="flex w-full gap-4">
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
        </div> */}
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        searchcolumns="name"
        apiURL="branchs?page=1&limit=50"
        url="/branch/create-branch"
        buttonTitle="Yangi Filial qo'shish"
      />
<<<<<<< HEAD

      <YMaps>
        <div>
          My awesome application with maps!
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
        </div>
      </YMaps>
=======
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
    </div>
  );
};

export default Branches;
