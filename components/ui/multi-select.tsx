"use client";

import { FC } from "react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

interface Option {
  options: {
    value: string;
    label: string;
    color?: string;
    icon?: React.ReactNode;
  }[];
  value: string[];
  onChange: (values: string[]) => void;
}
const animatedComponents = makeAnimated();

const MultiSelect: FC<Option> = ({ options, value, onChange }) => {
  return (
    <ReactSelect
      isMulti
      options={options}
      components={animatedComponents}
      onChange={(selectedOptions) =>
        onChange(selectedOptions.map((opt) => opt.value))
      }
      value={options.filter((option) => value?.includes(option.value))}
      instanceId="multi-select"
    />
  );
};

export default MultiSelect;
