"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  Phone,
  MoreHorizontal,
  Pencil,
  Trash2,
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface CarsTableProps<TData, TValue> {
  data?: Vehicle[];
}

export default function CarsTable<TData, TValue>({
  data = [],
}: CarsTableProps<TData, TValue>) {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);
  const [filterText, setFilterText] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Status badge colors
  const statusColors: Record<string, string> = {
    "Bo'sh": "bg-green-500 hover:bg-green-600",
    Ijarada: "bg-red-500 hover:bg-red-600",
    "Rezerv qilingan": "bg-amber-500 hover:bg-amber-600",
  };

  const filteredData = React.useMemo(() => {
    if (!filterText) return data;

    const searchText = filterText.toLowerCase();
    return data.filter(
      (item) =>
        item.brand.toLowerCase().includes(searchText) ||
        item.model.toLowerCase().includes(searchText) ||
        item.licensePlate.toLowerCase().includes(searchText) ||
        item.rentalStatus.toLowerCase().includes(searchText)
    );
  }, [data, filterText]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((row) => row.id));
    }
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to the first page when page size changes
  };

  const getStatusBadgeClass = (status: string) => {
    return statusColors[status] || "bg-gray-500 hover:bg-gray-600";
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
              <TableHead>Rental Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((car) => (
              <React.Fragment key={car.id}>
                <TableRow
                  className="border-t cursor-pointer"
                  onClick={() => toggleRowExpansion(car.id)}
                >
                  <TableCell className="p-4">
                    <Checkbox
                      checked={selectedRows.includes(car.id)}
                      onCheckedChange={() => toggleRowSelection(car.id)}
                      aria-label={`Select car ${car.id}`}
                    />
                  </TableCell>
                  <TableCell className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={
                        expandedRows.includes(car.id)
                          ? "Collapse details"
                          : "Expand details"
                      }
                      className="cursor-pointer"
                    >
                      {expandedRows.includes(car.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={car.photo || "/placeholder.svg?height=80&width=120"}
                      alt={`${car.brand} ${car.model}`}
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
                  <TableCell className="capitalize">{car.category}</TableCell>
                  <TableCell className="capitalize">
                    {car.licensePlate}
                  </TableCell>
                  <TableCell>{car.seatingCapacity}</TableCell>
                  <TableCell className="capitalize">
                    {car.transmission}
                  </TableCell>
                  <TableCell>${car.details.rentalPricePerDay} / day</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(car.rentalStatus)}>
                      {car.rentalStatus}
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
                        <DropdownMenuItem
                          onClick={() => console.log("Update:", car.id)}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => console.log("Delete:", car.id)}
                          className="flex items-center gap-2 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

                {expandedRows.includes(car.id) && (
                  <TableRow className="w-full border border-solid border-red-500">
                    <TableCell colSpan={8} className="p-0  ">
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
                                        <div className="font-medium">
                                          {car.brand}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Model
                                        </div>
                                        <div className="font-medium">
                                          {car.model}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          License Plate
                                        </div>
                                        <div className="font-medium">
                                          {car.licensePlate}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Year
                                        </div>
                                        <div className="font-medium">
                                          {car.details.madeYear}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Color
                                        </div>
                                        <div className="font-medium">
                                          {car.details.color}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Status
                                        </div>
                                        <Badge
                                          className={getStatusBadgeClass(
                                            car.rentalStatus
                                          )}
                                        >
                                          {car.rentalStatus}
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
                                        <div className="font-medium">
                                          {car.details.fuelType}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Transmission
                                        </div>
                                        <div className="font-medium">
                                          {car.transmission}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Engine Size
                                        </div>
                                        <div className="font-medium">
                                          {car.details.engineSize}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Mileage
                                        </div>
                                        <div className="font-medium">
                                          {car.details.mileage} km
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Seating Capacity
                                        </div>
                                        <div className="font-medium">
                                          {car.seatingCapacity} seats
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
                                          ${car.details.rentalPricePerDay} / day
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Deposit Required
                                        </div>
                                        <div className="font-medium">$5000</div>
                                      </div>
                                      <div>
                                        <div className="text-sm text-muted-foreground">
                                          Minimum Age
                                        </div>
                                        <div className="font-medium">
                                          25 years
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
                                          {car.details.owner.name}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div className="font-medium">
                                          {car.details.owner.phone}
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
                                      {car.details.description}
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Photos Tab */}
                          <TabsContent value="photos">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {car.details.photos.map((photo, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg overflow-hidden"
                                >
                                  <Image
                                    src={
                                      photo ||
                                      "/placeholder.svg?height=300&width=500"
                                    }
                                    alt={`${car.brand} ${car.model} photo ${
                                      index + 1
                                    }`}
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
                                  {car.details.features.map(
                                    (feature, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                                        <span className="text-sm">
                                          {feature}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
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
