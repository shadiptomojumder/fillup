"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductFilterBarProps {
    filters: { [key: string]: string };
    router: ReturnType<typeof useRouter>;
    pathname: string;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({ filters, router, pathname }) => {
    // Extract sorting params from the URL
    const sortBy = filters.sortBy || "";
    const sortOrder = filters.sortOrder || "";

    const updateSorting = (newSortBy: string, newSortOrder: string) => {
        const newSearchParams = new URLSearchParams(filters);
        if (newSortBy) {
            newSearchParams.set("sortBy", newSortBy);
        } else {
            newSearchParams.delete("sortBy");
        }

        if (newSortOrder) {
            newSearchParams.set("sortOrder", newSortOrder);
        } else {
            newSearchParams.delete("sortOrder");
        }

        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    return (
        <main>
            <section className="flex flex-col items-start gap-4 py-7">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="font-semibold">Sort By :</p>
                    <Button
                        onClick={() => updateSorting("", "")}
                        variant={"outline"}
                        className={`h-7 border-none bg-slate-100 px-2 text-xs text-black shadow-md hover:text-black sm:h-9 sm:px-4 sm:py-2 sm:text-sm ${
                            !sortBy ? "bg-[#73dd76] font-medium hover:bg-[#73dd76]" : ""
                        }`}>
                        Default
                    </Button>
                    <Button
                        onClick={() => updateSorting("price", "asc")}
                        variant={"outline"}
                        className={`h-7 border-none bg-slate-100 px-2 text-xs text-black shadow-md hover:text-black sm:h-9 sm:px-4 sm:py-2 sm:text-sm ${
                            sortBy === "price" && sortOrder === "asc"
                                ? "bg-[#73dd76] font-medium hover:bg-[#73dd76]"
                                : ""
                        }`}>
                        Price asc
                    </Button>
                    <Button
                        onClick={() => updateSorting("price", "desc")}
                        variant={"outline"}
                        className={`h-7 border-none bg-slate-100 px-2 text-xs text-black shadow-md hover:text-black sm:h-9 sm:px-4 sm:py-2 sm:text-sm ${
                            sortBy === "price" && sortOrder === "desc"
                                ? "bg-[#73dd76] font-medium hover:bg-[#73dd76]"
                                : ""
                        }`}>
                        Price desc
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default ProductFilterBar;
