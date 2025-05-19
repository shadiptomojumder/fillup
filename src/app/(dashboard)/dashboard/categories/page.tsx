"use client";
import getCategories from "@/api/categories/getCategories";
import { Category } from "@/interfaces/category.schemas";
import { useQuery } from "@tanstack/react-query";
import { Boxes } from "lucide-react";
import { columns } from "../categoriesTable/columns";
import { DataTable } from "../categoriesTable/data-table";

const AllCategoryPage = () => {
    const { data: categories } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    console.log("The categories are:", categories);

    return (
        <section className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <div className="mb-5">
                <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                    <Boxes />
                    All Categories
                </h2>
                <p className="text-start text-sm sm:text-left">
                    Select your image and suitable name for product and click create button.
                </p>
            </div>
            <div className="">
                <DataTable columns={columns} data={categories || []} />
            </div>
        </section>
    );
};

export default AllCategoryPage;
