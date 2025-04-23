"use client";

import { FC } from "react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

interface Option {
  options: { value: string; label: string }[];
  value: number[]; // ID lar raqam bo‘lishi kerak
  onChange: (values: number[]) => void; // Faqat ID larni qaytaramiz
}

const animatedComponents = makeAnimated();

const MultiSelect: FC<Option> = ({ options, value, onChange }) => {
  return (
    <ReactSelect
      isMulti
      options={options}
      components={animatedComponents}
      getOptionLabel={(e) => e.label}
      onChange={(selectedOptions) => {
        const selectedIds = selectedOptions.map((opt) => Number(opt.value));
        onChange(selectedIds);
      }}
      value={options.filter(
        (option) =>
          Array.isArray(value) && value?.includes(Number(option.value))
      )}
      instanceId="multi-select"
    />
  );
};

export default MultiSelect;
