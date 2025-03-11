"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput, InputGroup, InputInterface } from "@/interfaces";
import { ZodType } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import dynamic from "next/dynamic";
import Imageuploades from "./ui/imageuploades";
import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ICreateFormProps<T extends ZodType> {
  inputs: FormInput<T>[];
  formSchema: T;
  pageTitle?: string;
}

const CreateForm = <T extends ZodType>({
  inputs,
  formSchema,
  pageTitle,
}: ICreateFormProps<T>) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  ); // Last 50 years
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i), "MMMM")
  ); // Month names

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      inputs.flatMap((input) =>
        "name" in input
          ? [[input.name, ""]]
          : input.fields.map((field) => [field.name, ""])
      )
    ) as z.infer<T>,
  });

  const MultiSelect = dynamic(() => import("./ui/multi-select"), {
    ssr: false,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  p-4">
        <h1 className="flex items-center justify-center p-4 text-2xl font-bold text-center w-full rounded-md bg-black text-white">
          {pageTitle}
        </h1>
        {inputs.map((input, index) => {
          const inputObj = input as InputInterface<T>;
          const inputGroup = input as InputGroup<T>;

          if (inputObj.type === "single_line") {
            return (
              <FormField
                key={inputObj.name}
                control={form.control}
                name={inputObj.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{inputObj.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={inputObj.placeholder}
                        type={inputObj.inputType}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if (inputObj.type === "multi_line") {
            return (
              <FormField
                key={inputObj.name}
                control={form.control}
                name={inputObj.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{inputObj.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={inputObj.placeholder}
                        {...field}
                        className="h-32 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
          if (inputObj.type === "select" && inputObj.options) {
            return (
              <FormField
                key={inputObj.name}
                control={form.control}
                name={inputObj.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{inputObj.label}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={inputObj.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {inputObj.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center space-x-2">
                                {option.color && (
                                  <span
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: option.color }}
                                  ></span>
                                )}
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }

          if ("fields" in inputGroup) {
            return (
              <div
                key={index}
                className="space-y-4 border-2 border-solid border-gray-400 rounded-md p-4"
              >
                <h2 className="text-lg font-semibold">{inputGroup.title}</h2>
                <div
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  }}
                >
                  {Array.isArray(inputGroup.fields) &&
                    inputGroup.fields.map((item) => (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>{item.label}</FormLabel>
                            <FormControl>
                              {item.type === "single_line" ? (
                                <Input
                                  type={item.inputType}
                                  placeholder={item.placeholder}
                                  {...field}
                                  value={field.value ?? ""}
                                />
                              ) : item.type === "select" ? (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={item.placeholder}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {item.options?.map((option, index) => (
                                      <SelectItem
                                        key={index}
                                        value={option.value}
                                      >
                                        {option.color ? (
                                          <span className="flex items-center gap-2">
                                            <span
                                              className="w-4 h-4 rounded-full"
                                              style={{
                                                backgroundColor: option.color,
                                              }}
                                            ></span>
                                            {option.label}
                                          </span>
                                        ) : (
                                          option.label
                                        )}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : null}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                </div>
              </div>
            );
          }
          if (inputObj.type === "multi_select" && inputObj.options) {
            return (
              <FormField
                key={inputObj.name}
                control={form.control}
                name={inputObj.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{inputObj.label}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={inputObj.options ?? []}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
          if (inputObj.type === "multi_image") {
            return (
              <FormField
                key={inputObj.name}
                control={form.control}
                name={inputObj.name}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{inputObj.label}</FormLabel>
                      <FormControl>
                        <Imageuploades
                          name={inputObj.name}
                          value={field.value || []}
                          onChange={(imageList) => field.onChange(imageList)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          }

          return null;
        })}
        <Button type="submit" className="w-full cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
