"use client";
import React, { FC, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ICategory } from "@/interfaces/Categories";
import { Button } from "../ui/button";
import { Car, Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { ResponsiveModal } from "../ResponsiveModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Vehicle } from "@/app/cars/page";

// Props Interface
interface ICategoriesProps {
  initialData: ICategory[];
  url: string;
}

// Form Schema Validation
const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
});

// Form Type from Zod
type FormValues = z.infer<typeof formSchema>;

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

const Categories: FC<ICategoriesProps> = ({ initialData, url }) => {
  // Refetcher with SWR hook
  const {
    data: categories,
    error,
    mutate,
  } = useSWR(url, fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
  });

  // States
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  // Fetch cars of selected category
  const categoryId = selectedCategory?.category?.id;
  const { data: categoryData, isLoading } = useSWR(
    categoryId ? `${url}${categoryId}/` : null,
    fetcher
  );

  // Open Cars Modal
  const openCarsModal = (category: ICategory) => {
    if (category.category) {
      setSelectedCategory(category);
    }
  };

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Hook Form
  const categoryForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  // Open modal for add/edit
  const openModal = (category: ICategory | null = null) => {
    setSelectedCategory(category);
    categoryForm.reset(
      category ? { name: category?.category?.name } : { name: "" }
    );
    setIsOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  // Submit add/edit form
  async function onSubmit(data: FormValues) {
    setLoading(true);
    const token = Cookies.get("token");
    const endpoint = selectedCategory
      ? `${url}${selectedCategory?.category?.id}/`
      : url;

    const response = await fetch(endpoint, {
      method: selectedCategory ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: data.name }),
    });

    if (response.ok) {
      mutate();
      setIsOpen(false);
    } else {
      console.error("Failed to save category:", await response.text());
    }
    setLoading(false);
  }

  // Delete category
  async function handleDelete() {
    if (!selectedCategory) return;

    setLoading(true);
    const token = Cookies.get("token");

    const response = await fetch(`${url}${selectedCategory?.category?.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      mutate();
      setIsDeleteOpen(false);
    } else {
      console.error("Failed to delete category:", await response.text());
    }
    setLoading(false);
  }

  console.log("selectedCategory", selectedCategory);

  // Search by Category
  const filteredCategories = categories?.filter((item: ICategory) =>
    item.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <p className="text-red-500">Failed to load categories</p>;

  return (
    <>
      <div className="px-4 py-2 flex flex-col gap-4">
        <div className="container mx-auto py-5">
          <h1 className="text-2xl font-bold mb-4">Avtomobil kategoriyalar</h1>

          {/* Add Category Button */}
          <div className="flex gap-4 mb-8 w-full items-center justify-between">
            <Input
              placeholder="Izlash..."
              className="w-1/2 md:w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="w-1/2 md:w-max" onClick={() => openModal()}>
              <Plus />
              Add Category
            </Button>
          </div>

          {/* Categories List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredCategories?.map(
              ({ category, number_of_cars }: ICategory) => (
                <Card key={category.id} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="capitalize text-3xl">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-md">
                      {number_of_cars} ta avtomobillar mavjud
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    {/* View Cars */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() =>
                            openCarsModal({ category, number_of_cars })
                          }
                        >
                          <Car className="mr-2 h-4 w-4" />
                          View Cars
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cars in {category.name}</DialogTitle>
                        </DialogHeader>
                        {isLoading ? (
                          <div className="flex justify-center items-center py-4">
                            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                          </div>
                        ) : categoryData?.cars?.length > 0 ? (
                          <Table>
                            <TableCaption>
                              List of cars in {category.name} category
                            </TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Car Name</TableHead>
                                <TableHead>License Plate</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {categoryData.cars.map((car: Vehicle) => (
                                <TableRow key={car.id}>
                                  <TableCell className="font-medium">
                                    {car.id}
                                  </TableCell>
                                  <TableCell>
                                    {car.brand} {car.model}
                                  </TableCell>
                                  <TableCell>{car.license_plate}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-gray-500">
                            No cars found in this category.
                          </p>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Buttons of Card */}
                    <div className="flex gap-2">
                      {/* Edit Category */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openModal({ category, number_of_cars })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* Delete Category */}
                      <Button
                        variant="outline"
                        className="bg-red-600 text-white hover:bg-red-500"
                        size="icon"
                        onClick={() =>
                          openDeleteModal({ category, number_of_cars })
                        }
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>

        {/* Dialog Modal for Adding/Editing Categories */}
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedCategory ? "Edit Category" : "Add Category"}
                </DialogTitle>
              </DialogHeader>
              <form
                onSubmit={categoryForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...categoryForm.register("name")} />
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : selectedCategory ? (
                      "Save changes"
                    ) : (
                      "Create Category"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ResponsiveModal
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        title={`Are you sure you want to delete "${selectedCategory?.category?.name}"?`}
        description="This action cannot be undone."
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default Categories;
