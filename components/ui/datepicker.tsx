"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  selected?: Date;
  onChange?: (date: Date) => void;
}

export function DatePicker({
  startYear = getYear(new Date()) - 50,
  endYear = getYear(new Date()),
  selected,
  onChange,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    selected || new Date()
  );

  React.useEffect(() => {
    if (selected) {
      setInternalDate(selected);
    }
  }, [selected]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setInternalDate(date);
      onChange?.(date);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    if (!internalDate) return;
    const newDate = setMonth(internalDate, months.indexOf(month));
    handleDateChange(newDate);
  };

  const handleYearChange = (year: string) => {
    if (!internalDate) return;
    const newDate = setYear(internalDate, parseInt(year));
    handleDateChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !internalDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {internalDate ? (
            format(internalDate, "dd-MM-yyyy")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex items-center gap-2 p-2">
          <Select
            onValueChange={handleMonthChange}
            value={internalDate ? months[getMonth(internalDate)] : ""}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={internalDate ? getYear(internalDate).toString() : ""}
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={internalDate}
          onSelect={handleDateChange}
          initialFocus
          month={internalDate}
          onMonthChange={setInternalDate}
        />
      </PopoverContent>
    </Popover>
  );
}
