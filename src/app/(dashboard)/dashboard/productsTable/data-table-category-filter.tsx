"use client";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";
import * as React from "react";

import getCategories from "@/api/categories/getCategories";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui//command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui//popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/interfaces/category.schemas";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface DataTableCategoryFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
}

export function DataTableCategoryFilter<TData, TValue>({
    column,
    title,
}: DataTableCategoryFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues();
    const selectedValues = new Set(column?.getFilterValue() as Array<string>);
    // console.log("selectedValues is:", selectedValues);

    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    const { data: categories, isLoading } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    return (
        <Popover onOpenChange={setMenuOpen} open={menuOpen}>
            <PopoverTrigger asChild className="w-full">
                <button className="flex h-10 cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1 text-sm">
                    <PlusCircledIcon className="mr-1 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal">
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    categories &&
                                    categories
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal">
                                                {option.title}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0 md:w-[200px]" align="center">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {isLoading ? (
                                <CommandEmpty>No results found.</CommandEmpty>
                            ) : (
                                categories?.map((option) => {
                                    const isSelected = selectedValues.has(option.value);
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => {
                                                if (isSelected) {
                                                    selectedValues.delete(option.value);
                                                } else {
                                                    selectedValues.add(option.value);
                                                }
                                                const filterValues = Array.from(selectedValues);
                                                column?.setFilterValue(
                                                    filterValues.length ? filterValues : undefined,
                                                );
                                            }}>
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-white"
                                                        : "opacity-50 [&_svg]:invisible",
                                                )}>
                                                <CheckIcon
                                                    className={`h-4 w-4 ${isSelected ? "text-white" : "text-black"}`}
                                                />
                                            </div>

                                            <span className="text-gray-900 capitalize">
                                                {option.title}
                                            </span>
                                            {/* {facets?.get(option.value) && (
                                                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                    {facets.get(option.value)}
                                                </span>
                                            )} */}
                                            {facets && (
                                                <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                    {facets.get(option.value) ?? 0}
                                                </span>
                                            )}
                                        </CommandItem>
                                    );
                                })
                            )}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            column?.setFilterValue(undefined);
                                            setMenuOpen(false);
                                        }}
                                        className="justify-center text-center">
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
