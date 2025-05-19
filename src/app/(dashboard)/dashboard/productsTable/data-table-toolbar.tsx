import { Input } from "@/components/ui//input";
import { Table } from "@tanstack/react-table";
import { DataTableCategoryFilter } from "./data-table-category-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    setFiltering: (filtering: string) => void;
    filtering: string;
}

export function DataTableToolbar<TData>({
    table,
    filtering,
    setFiltering,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex justify-between py-5">
            <section className="flex items-center min-[424px]:justify-start justify-between min-lg:gap-5 gap-2 w-full">
                <div className="min-lg:w-[400px] min-md:w-[250px] min-sm:w-[350px]">
                    <Input
                        placeholder="Find by product name..."
                        value={filtering}
                        onChange={(event) => setFiltering(event.target.value)}
                        className="h-10 w-full focus-visible:border-primary focus-visible:ring-0"
                    />
                </div>
                <div>
                    {table.getColumn("category") && (
                        <DataTableCategoryFilter
                            column={table.getColumn("category")}
                            title="Categories"
                        />
                    )}
                </div>
            </section>

            <div className="hidden min-[425px]:block">
            <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
