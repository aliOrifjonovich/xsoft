import React, { FC } from "react";
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
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface CarsGroupProps {
  data?: Vehicle[];
}
const CarsGroup: FC<CarsGroupProps> = ({ data }) => {
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
                Avtomobillar
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button className="flex gap-2 cursor-pointer">
          <Plus />
          Add Reservation
        </Button>
      </div>
      <CarsTable data={data || []} />
    </div>
  );
};

export default CarsGroup;
