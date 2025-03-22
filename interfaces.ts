import { Path } from "react-hook-form";
import { TypeOf, ZodType } from "zod";

export interface InputInterface<T extends ZodType> {
  name: Path<TypeOf<T>>;
  label: string;
  type: string;
  inputType?: string;
  placeholder?: string;
  options?: {
    value: string;
    label: string;
    color?: string;
    icon?: string;
  }[];
}

export interface InputGroup<T extends ZodType> {
  title?: string;
  fields: InputInterface<T>[];
}

// 🔹 Umumiy inputlar turi (yagona input yoki bo'lim)
export type FormInput<T extends ZodType> = InputInterface<T> | InputGroup<T>;
