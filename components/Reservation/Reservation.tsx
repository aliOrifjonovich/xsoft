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
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

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
              <BreadcrumbPage className="font-medium">Buyurt</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="flex gap-2 cursor-pointer">
          <Plus />
          Add Reservation
        </Button>
      </div>
      <DataTable columns={columns} data={data || []} isReservation />
    </div>
  );
};

export default Reservation;
