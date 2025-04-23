"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { RuLangIcon, UzLangIcon } from "@/Icons/Icons";

const languages = [
  { code: "uz", label: "Uzbek", icon: <UzLangIcon /> },
  { code: "ru", label: "Russian", icon: <RuLangIcon /> },
];

const LanguageSelection = () => {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<
    (typeof languages)[number] | null
  >(null);

  // Ensure the selected language is set only on the client
  useEffect(() => {
    const savedLang = Cookies.get("locale") || "uz"; // Default to 'uz' if no cookie
    const foundLang =
      languages.find((lang) => lang.code === savedLang) || languages[0];
    setSelectedLang(foundLang);
  }, []);

  const handleLanguageChange = (value: string) => {
    const newLang = languages.find((lang) => lang.code === value)!;
    setSelectedLang(newLang);
    Cookies.set("locale", newLang.code);
    setTimeout(() => {
      router.refresh();
    }, 100);
  };

  if (!selectedLang) return null; // Prevent rendering until state is initialized

  return (
    <Select
      onValueChange={handleLanguageChange}
      defaultValue={selectedLang.code}
    >
      <SelectTrigger className="w-[100px] flex items-center gap-2">
        <span className="flex items-center gap-2">
          {selectedLang?.icon}
          {selectedLang?.code.toUpperCase()}
        </span>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            className="flex items-center gap-2"
          >
            {lang.icon}
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelection;
