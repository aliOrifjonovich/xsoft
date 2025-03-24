"use client";
import { FormInput } from "@/interfaces";
import React, { FC } from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";
import { IBranches } from "@/app/cars/create-car/page";

interface ICreateStaffs {
  branchs: IBranches[];
  updatedValues?: z.infer<typeof formSchema>;
  isUpdated?: boolean;
  id?: number;
}
const formSchema = z.object({
  fullname: z.string().min(1),
  phone_number: z.string().min(1),
  position: z.string().min(1),
  gender: z.enum(["Male", "Female"]),
  dob: z.date().min(new Date("1900-01-01"), "Yilni kiriting"),
  employmentType: z.enum(["Full_time", "Part_time", "Contract"]),
  hireDate: z.date().min(new Date("1900-01-01"), "Yilni kiriting"),
  branch: z.preprocess((val) => Number(val), z.number().min(1)),
  salary: z.preprocess((val) => Number(val), z.number().min(1)),
  workStatus: z.enum(["Active", "Vacation", "Fired"]),
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList,
      "Please upload at least one image"
    )
    .optional(),
});

const CreateStaff: FC<ICreateStaffs> = ({
  branchs,
  updatedValues,
  isUpdated,
  id,
}) => {
  const inputs: FormInput<typeof formSchema>[] = [
    {
      title: "Xodimlarni ma'lumotlari",
      fields: [
        {
          type: "single_line",
          inputType: "text",
          label: "Ism-familiya",
          placeholder: "Mirjalol Karimov",
          name: "fullname",
        },
        {
          type: "select",
          inputType: "text",
          label: "Jinsi",
          name: "gender",
          placeholder: "Erkak",
          options: [
            { label: "Erkak", value: "Male" },
            { label: "Ayol", value: "Female" },
          ],
        },
        {
          type: "single_line",
          inputType: "text",
          label: "Telefon raqami",
          placeholder: "+998930690225",
          name: "phone_number",
        },
        {
          type: "datePicker",
          inputType: "date",
          label: "Tug'ilgan sanasi",
          name: "dob",
        },
        {
          type: "single_line",
          inputType: "text",
          label: "Mansabi",
          placeholder: "Menejer",
          name: "position",
        },
        {
          type: "datePicker",
          inputType: "date",
          label: "Ishga olingan sanasi",
          name: "hireDate",
        },
        {
          type: "select",
          label: "Ish joyi",
          name: "branch",
          placeholder: "Yunusobod",
          options: branchs?.map((branch: IBranches) => ({
            id: branch.id,
            label: branch.name,
            value: branch.id.toString(),
          })),
        },
        {
          type: "single_line",
          inputType: "number",
          label: "Oylik maosh",
          placeholder: "15000",
          name: "salary",
        },
        {
          type: "select",
          label: "Ish turi",
          name: "employmentType",
          placeholder: "Ish turi",
          options: [
            { label: "To'liq staf", value: "Full_time" },
            { label: "Yarim staf", value: "Part_time" },
            { label: "Kontrakt", value: "Contract" },
          ],
        },
        {
          type: "select",
          label: "Status",
          name: "workStatus",
          placeholder: "Ish holatini tanlang",
          options: [
            { label: "Active", value: "Active" },
            { label: "Ta'tilda", value: "Vacation" },
            { label: "Bo'shagan", value: "Fired" },
          ],
        },
      ],
    },
    // {
    //   type: "multi_image",
    //   // inputType: "file",
    //   label: "Xodimning rasmi",
    //   name: "image",
    // },
  ];

  console.log("updatedValues", updatedValues);

  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi xodimlarni qo'shish"
      url="employee/"
      pageUrl="/staffs"
      toastMessage="Xodim"
      updatedValues={updatedValues}
      isUpdated={isUpdated}
      id={id}
    />
  );
};

export default CreateStaff;
