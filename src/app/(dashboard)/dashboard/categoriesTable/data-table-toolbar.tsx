import { Input } from "@/components/ui//input";
import { Table } from "@tanstack/react-table";
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
            <div className="">
                <Input
                    placeholder="Find by category title..."
                    value={filtering}
                    onChange={(event) => setFiltering(event.target.value)}
                    className="h-10 w-full focus-visible:border-primary focus-visible:ring-0 md:min-w-[250px]"
                />
            </div>

            <DataTableViewOptions table={table} />
        </div>
    );
}
