import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import LanguageSelection from "./LanguageSelection";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("HomePage");
  return (
    <>
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex justify-between items-center gap-2 px-4 w-full">
          <div className="flex items-center ">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 "
            />
            <h3 className="text-md font-semibold">{t("title")}</h3>
          </div>

          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cursor-pointer  relative rounded-full">
                  <span className="text-white font-semibold absolute -top-2 -right-2 text-xs border-2 border-red-600 rounded-full w-4 h-4 flex items-center justify-center bg-red-600">
                    3
                  </span>
                  <Bell />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-85">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3 w-2/3">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            New Reservation for
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tesla Model S
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-1/3">
                        <Button className="text-xs cursor-pointer">
                          <CheckCheck />
                        </Button>
                        <Button className="text-xs cursor-pointer bg-red-500">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3 w-2/3">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            New Reservation for
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tesla Model S
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-1/3">
                        <Button className="text-xs cursor-pointer">
                          <CheckCheck />
                        </Button>
                        <Button className="text-xs cursor-pointer bg-red-500">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3 w-2/3">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            New Reservation for
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Tesla Model S
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-1/3">
                        <Button className="text-xs cursor-pointer">
                          <CheckCheck />
                        </Button>
                        <Button className="text-xs cursor-pointer bg-red-500">
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* <LanguageSelection /> */}
          </div>
        </div>
      </header>
      <Separator
        orientation="horizontal"
        className="mr-2 data-[orientation=vertical]:h-4 mb-4"
      />
    </>
  );
};

export default Header;
