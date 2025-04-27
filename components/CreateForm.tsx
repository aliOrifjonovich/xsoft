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
import "react-day-picker/dist/style.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format, getYear } from "date-fns";
import { DatePicker } from "./ui/datepicker";
import { apiServiceMultipart } from "@/lib/api-client";
import { PhoneInput } from "./ui/phone-input";

interface ICreateFormProps<T extends ZodType> {
  inputs: FormInput<T>[];
  formSchema: T;
  pageTitle?: string;
  url?: string;
  pageUrl?: string;
  updatedValues?: z.infer<T>;
  isUpdated?: boolean;
  toastMessage?: string;
  id?: number;
}

const CreateForm = <T extends ZodType>({
  inputs,
  formSchema,
  pageTitle,
  url,
  pageUrl,
  updatedValues,
  isUpdated,
  toastMessage,
  id,
}: ICreateFormProps<T>) => {
  const router = useRouter();

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: isUpdated
      ? updatedValues
      : (Object.fromEntries(
          inputs.flatMap((input) =>
            "name" in input
              ? [[input.name, ""]]
              : input.fields.map((field) => [field.name, ""])
          )
        ) as z.infer<T>),
  });

  const MultiSelect = dynamic(() => import("./ui/multi-select"), {
    ssr: false,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      // Ensure `values.images` is always an array
      const images = values.images ?? [];

      images.forEach((image: { file: Blob }, index: number) => {
        formData.append(
          `images`,
          image.file,
          `image_${index}.${image.file.type.split("/")[1]}`
        );
      });

      Object.keys(values).forEach((key) => {
        if (key !== "images" && key !== "features") {
          let value = values[key];

          if (value instanceof Date) {
            value = format(value, "yyyy-MM-dd");
          }

          formData.append(key, String(value));
        }
      });

      // Append features as separate entries
      if (Array.isArray(values.features) && values.features.length > 0) {
        values.features.forEach((featureId: number) => {
          formData.append("features", String(featureId));
        });
      } else {
        console.warn("No features selected");
      }

      // Using our centralized API service for multipart form data
      const endpoint = id ? `/${url}${id}/` : `/${url}`;

      let result;
      if (isUpdated) {
        result = await apiServiceMultipart.put(endpoint, formData);
      } else {
        result = await apiServiceMultipart.post(endpoint, formData);
      }

      pageUrl && router.push(pageUrl);

      const message = id
        ? `${toastMessage} muvaffaqiyatli o'zgartirildi`
        : `${toastMessage} muvaffaqiyatli qo'shildi`;

      toast.success(message, {
        position: "top-right",
        closeButton: true,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error: unknown) {
      toast.error(
        (error instanceof Error ? error.message : "") ||
          `${toastMessage} qo'shilmadi. Iltimos qayta urinib ko'ring`,
        {
          position: "top-right",
          closeButton: true,
          style: {
            border: "1px solid red",
            backgroundColor: "red",
            color: "white",
          },
        }
      );
    }
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
                        onChange={(event) => {
                          inputObj.inputType === "number"
                            ? field.onChange(Number(event.target.value))
                            : field.onChange(event.target.value);
                        }}
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
                                  onChange={(event) => {
                                    item.inputType === "number"
                                      ? field.onChange(
                                          Number(event.target.value)
                                        )
                                      : field.onChange(event.target.value);
                                  }}
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
                              ) : item.type === "datePicker" ? (
                                <DatePicker
                                  selected={field.value}
                                  onChange={(date) => field.onChange(date)}
                                  endYear={
                                    pageUrl === "/clients"
                                      ? getYear(new Date()) + 100
                                      : getYear(new Date())
                                  }
                                />
                              ) : item.type === "phone_number" ? (
                                <PhoneInput
                                  onChange={field.onChange}
                                  value={field.value}
                                  defaultCountry="UZ"
                                />
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
