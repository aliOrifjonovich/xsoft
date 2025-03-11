"use client";
import { FormInput } from "@/interfaces";
import React from "react";
import { z } from "zod";
import CreateForm from "../CreateForm";

const formSchema = z.object({
  fullname: z.string().min(1),
  phonenumber: z.string().min(1),
  postion: z.string().min(1),
  gender: z.enum(["male", "female"]),
  workingtype: z.enum(["full-time", "part-time", "contract"]),
  hireddate: z.string().min(1),
  worklocation: z.string().min(1),
  salary: z.preprocess((val) => Number(val), z.number().min(1)),
  status: z.enum(["active", "ta'tilda", "bo'shagan"]),
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Please upload at least one image"
    )
    .optional(),
});

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
          { label: "Erkak", value: "male" },
          { label: "Ayol", value: "female" },
        ],
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Telefon raqami",
        placeholder: "+998930690225",
        name: "phonenumber",
      },
      {
        type: "single_line",
        inputType: "text",
        label: "Mansabi",
        placeholder: "Menejer",
        name: "postion",
      },
      {
        type: "single_line",
        inputType: "number",
        label: "Ishga olingan sanasi",
        placeholder: "10/12/2024",
        name: "hireddate",
      },
      {
        type: "select",
        label: "Ish joyi",
        name: "worklocation",
        placeholder: "Yunusobod",
        options: [
          { label: "Yunusobod", value: "yunusobod" },
          { label: "Mirzo Ulug'bek", value: "mirzo ulug'bek" },
        ],
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
        label: "Status",
        name: "status",
        placeholder: "✅ Active",
        options: [
          { label: "✅ Active", value: "active" },
          { label: "Ta'tilda", value: "ta'tilda" },
          { label: "Bo'shagan", value: "bo'shagan" },
        ],
      },
    ],
  },
  {
    type: "multi_image",
    label: "Xodimning rasmi",
    name: "image",
  },
];

const CreateStaff = () => {
  return (
    <CreateForm<typeof formSchema>
      inputs={inputs}
      formSchema={formSchema}
      pageTitle="Yangi xodimlarni qo'shish"
    />
  );
};

export default CreateStaff;
