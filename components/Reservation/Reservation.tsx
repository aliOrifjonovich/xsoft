import { columns, Rental } from "@/app/reservations/columns";
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

interface ReservationProps {
  data?: Rental[];
}
const Reservation: FC<ReservationProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">
                Buyurtmalar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        searchcolumns="carType"
        isReservation
        url=""
        buttonTitle="Buyurtma qo'shish"
      />
    </div>
  );
};

export default Reservation;
