"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  Phone,
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Vehicle } from "@/app/cars/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useRouter } from "next/navigation";
import { FeaturesIcon } from "@/Icons/FeaturesIcon";
import { ResponsiveModal } from "./ResponsiveModal";
import { Fragment } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import { BASE_URL } from "./data-table";
import { toast } from "sonner";
import Link from "next/link";

interface CarsTableProps {
  data?: Vehicle[];
  buttonTitle?: string;
  apiURL?: string;
}

export default function CarsTable({
  data = [],
  buttonTitle,
  apiURL,
}: CarsTableProps) {
  //States
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);

  const token = Cookies.get("token");
  const fetcher = (url: string) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { data: swrData, mutate } = useSWR(`${BASE_URL}${apiURL}`, fetcher, {
    fallbackData: data,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    revalidateOnReconnect: true,
  });

  // Status badge colors
  const statusColors: Record<string, string> = {
    "Bo'sh": "bg-green-500 hover:bg-green-600",
    Ijarada: "bg-red-500 hover:bg-red-600",
    "Reserv qilingan": "bg-amber-500 hover:bg-amber-600",
  };

  const filteredData = useMemo(() => {
    if (!filterText) return swrData?.results ?? [];

    const searchText = filterText.toLowerCase();
    return swrData?.results?.filter(
      (item: Vehicle) =>
        item.brand.toLowerCase().includes(searchText) ||
        item.model.toLowerCase().includes(searchText) ||
        item.license_plate.toLowerCase().includes(searchText) ||
        item.rental_status.toLowerCase().includes(searchText)
    );
  }, [swrData, filterText]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row: Vehicle) => row.id));
    }
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const getStatusBadgeClass = (status: string) => {
    return statusColors[status] || "bg-gray-500 hover:bg-gray-600";
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `https://carmanagement-1-rmyc.onrender.com/api/v1/cars/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await mutate(`${BASE_URL}cars?page=1&limit=100`, { revalidate: true });
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    } finally {
      setOpen(false);
      setLoading(false);
      toast.success("Car deleted successfully", {
        position: "top-right",
        closeButton: true,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }

    setOpen(false);
    window.location.reload();
  };

  const PaginationControls = () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="w-full mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search cars..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-md border-input"
        />

        <Link href="/cars/create-car">
          <Button className="flex gap-2 cursor-pointer">
            <Plus />
            {buttonTitle}
          </Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10 p-4">
                <Checkbox
                  checked={
                    selectedRows.length === filteredData.length &&
                    filteredData.length > 0
                  }
                  onCheckedChange={toggleAllRows}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-10 p-4"></TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Seats</TableHead>
              <TableHead>Transmission</TableHead>
              <TableHead>Filial</TableHead>
              <TableHead>Rental Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} className="py-20 text-center">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto text-gray-500" />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData?.map((car: Vehicle) => (
                <Fragment key={car?.id}>
                  <TableRow
                    className="border-t cursor-pointer"
                    onClick={() => toggleRowExpansion(car?.id)}
                  >
                    <TableCell className="p-4">
                      <Checkbox
                        checked={selectedRows.includes(car?.id)}
                        onCheckedChange={() => toggleRowSelection(car?.id)}
                        aria-label={`Select car ${car?.id}`}
                      />
                    </TableCell>
                    <TableCell className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={
                          expandedRows.includes(car?.id)
                            ? "Collapse details"
                            : "Expand details"
                        }
                        className="cursor-pointer"
                      >
                        {expandedRows.includes(car?.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Image
                        src={`https://carmanagement-1-rmyc.onrender.com${
                          car.images?.[0]?.photo || ""
                        }`}
                        alt={`${car.brand}`}
                        width={80}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium capitalize">{car.model}</div>
                      <div className="text-muted-foreground capitalize">
                        {car.brand}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {car.category.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {car.license_plate}
                    </TableCell>
                    <TableCell>{car.seating_capacity}</TableCell>
                    <TableCell className="capitalize">
                      {car.transmission}
                    </TableCell>
                    <TableCell className="capitalize">
                      {car.branch.name}
                    </TableCell>
                    <TableCell>{car.rental_price_per_day} / day</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeClass(car.rental_status)}>
                        {car.rental_status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link href={`/cars/create-car?id=${car?.id}`}>
                            <DropdownMenuItem className="flex items-center gap-2 ">
                              <Pencil className="h-4 w-4" /> Update
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setOpen(true);
                            }}
                            className="flex items-center gap-2 text-red-500"
                          >
                            {loading ? (
                              <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                              <span className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </span>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <ResponsiveModal
                        open={open}
                        setOpen={setOpen}
                        loading={loading}
                        title={`${car.model} fillialini o'chirmoqchimisiz??`}
                        description="Shu branchni o‘chirishni tasdiqlaysizmi?"
                        onConfirm={() => handleDelete(Number(car?.id))}
                      />
                    </TableCell>
                  </TableRow>

                  {expandedRows.includes(car?.id) && (
                    <TableRow className="w-full bg-muted hover:bg-trnasparent">
                      <TableCell colSpan={12} className="p-0">
                        <div className="p-6">
                          <Tabs defaultValue="details" className="w-full ">
                            <TabsList className="mb-4">
                              <TabsTrigger
                                value="details"
                                className="cursor-pointer"
                              >
                                Car Details
                              </TabsTrigger>
                              <TabsTrigger
                                value="photos"
                                className="cursor-pointer"
                              >
                                Photos
                              </TabsTrigger>
                              <TabsTrigger
                                value="features"
                                className="cursor-pointer"
                              >
                                Features
                              </TabsTrigger>
                            </TabsList>

                            {/* Details Tab */}
                            <TabsContent
                              value="details"
                              className="space-y-4 w-full"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="text-lg font-semibold mb-3">
                                        Basic Information
                                      </h3>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Brand
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.brand}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Model
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.model}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            License Plate
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.license_plate}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Year
                                          </div>
                                          <div className="font-medium">
                                            {car.year}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground ">
                                            Color
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.color}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Mashinaning Fillial
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.branch.name}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Status
                                          </div>
                                          <Badge
                                            className={getStatusBadgeClass(
                                              car.rental_status
                                            )}
                                          >
                                            {car.rental_status}
                                          </Badge>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="text-lg font-semibold mb-3">
                                        Technical Specifications
                                      </h3>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Fuel Type
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.fuel_type}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Transmission
                                          </div>
                                          <div className="font-medium capitalize">
                                            {car.transmission}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Engine Size
                                          </div>
                                          <div className="font-medium">
                                            {car.engine_size}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Mileage
                                          </div>
                                          <div className="font-medium">
                                            {car.mileage} km
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Seating Capacity
                                          </div>
                                          <div className="font-medium">
                                            {car.seating_capacity} seats
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="text-lg font-semibold mb-3">
                                        Rental Information
                                      </h3>
                                      <div className="space-y-3">
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Daily Rental Price
                                          </div>
                                          <div className="font-medium text-lg">
                                            {car.rental_price_per_day} / day
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Deposit Required
                                          </div>
                                          <div className="font-medium">
                                            {car.deposit}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-sm text-muted-foreground">
                                            Minimum Age
                                          </div>
                                          <div className="font-medium">
                                            {car.minimum_age} years
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="text-lg font-semibold mb-3">
                                        Owner Information
                                      </h3>
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <User className="h-4 w-4 text-muted-foreground" />
                                          <div className="font-medium">
                                            {car.owner_name}
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <div className="font-medium">
                                            {car.owner_phone}
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card className="w-full rounded-lg">
                                    <CardContent className="flex flex-col gap-2 p-4 w-full">
                                      <h3 className="text-lg font-semibold mb-3">
                                        Description
                                      </h3>
                                      <p className="text-sm text-gray-700 leading-normal break-words whitespace-normal max-w-full">
                                        {car.description}
                                      </p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                            </TabsContent>

                            {/* Photos Tab */}
                            <TabsContent value="photos">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {car?.images?.map((photo, index) => (
                                  <div
                                    key={index}
                                    className="rounded-lg overflow-hidden"
                                  >
                                    <Image
                                      src={`https://carmanagement-1-rmyc.onrender.com${photo?.photo}`}
                                      alt={`${car?.brand}`}
                                      width={500}
                                      height={300}
                                      className="w-full h-auto object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            {/* Features Tab */}
                            <TabsContent value="features">
                              <Card>
                                <CardContent className="p-4">
                                  <h3 className="text-lg font-semibold mb-4">
                                    Car Features
                                  </h3>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {car?.features?.map((feature, index) => {
                                      const FeatureIcon = FeaturesIcon(
                                        feature.icon
                                      );

                                      return (
                                        <div
                                          key={index}
                                          className="flex items-center gap-4"
                                        >
                                          {FeatureIcon && <FeatureIcon />}
                                          <span>{feature?.name}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8">
                {pageSize} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[1, 10, 20, 50, 100].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => handlePageSizeChange(size)}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <PaginationControls />
      </div>
    </div>
  );
}
