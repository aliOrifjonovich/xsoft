"use client";
import { FormInput } from "@/interfaces";
import React, { FC } from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import { BranchesType } from "@/app/branch/columns";

interface CreateBranchProps {
  updatedValues: BranchesType;
  isUpdated: boolean;
  id: number;
}

const formSchema = z.object({
  name: z.string().min(1, "Filial nomini kiriting"),
  address: z.string().min(1, "Filial manzilini kiriting"),
  year_of_construction: z.date().min(new Date("1900-01-01"), "Yilni kiriting"),
  total_area: z.number().min(0, "Necha metr kvadratligini kiriting"),
  google_map_link: z.string().url("Invalid Google Maps URL"),
  yandex_map_link: z.string().url("Invalid Yandex Maps URL"),
});

const inputs: FormInput<typeof formSchema>[] = [
  {
    title: "Avtomobil ma'lumotlari",
    fields: [
      {
        type: "single_line",
        inputType: "text",
        label: "Branch Name",
        placeholder: "Oybek filiali",
        name: "name",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Address",
        placeholder: "Yunusobod, Toshkent",
        name: "address",
      },
      {
        type: "datePicker",
        inputType: "date",
        label: "Year of Construction",
        name: "year_of_construction",
      },
      {
        type: "single_line",
        inputType: "number",
        label: "Total area",
        placeholder: "100",
        name: "total_area",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Googel map link",
        placeholder: "https://www.google.com/maps",
        name: "google_map_link",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Yandex map link",
        placeholder: "https://www.yandex.com/maps",
        name: "yandex_map_link",
      },
    ],
  },
];

const CreateBranch: FC<CreateBranchProps> = ({
  updatedValues,
  isUpdated,
  id,
}) => {
  return (
    <>
      <CreateForm<typeof formSchema>
        inputs={inputs}
        formSchema={formSchema}
        pageTitle={"Yangi Filial qo'shish"}
        url="branchs/"
        pageUrl="/branch"
        toastMessage={"Filial"}
        updatedValues={{
          ...updatedValues,
        }}
        isUpdated={isUpdated}
        id={id}
      />
    </>
  );
};

export default CreateBranch;
