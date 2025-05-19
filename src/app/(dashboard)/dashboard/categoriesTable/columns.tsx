"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
// import ActionButton from "./ActionButton";
import { Category } from "@/interfaces/category.schemas";
import { format } from "date-fns";
import Image from "next/image";
import Actions from "./actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "logo",
        accessorKey: "logo",
        header: () => <p className="text-nowrap">Category Icon</p>,
        cell: ({ row }) => (
            <Image
                src={row.getValue("logo")}
                alt="Logo"
                width={100}
                height={100}
                className="aspect-[300/300] max-w-[84px] min-w-[84px] rounded-md object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
        ),
    },
    {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
        cell: ({ row }) => (
            <div className="text-base font-medium text-nowrap capitalize">
                {row.getValue("title")}
            </div>
        ),
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div className="capitalize">{format(date, "dd MMMM yy")}</div>;
        },
    },
    {
        id: "id",
        accessorKey: "id",
        header: () => <div>Actions</div>,
        cell: ({ row }) => {
            const categoryId = row.getValue("id");
            //console.log("categoryId", categoryId);

            return <Actions categoryId={categoryId as string} />;
        },
    },

    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const product = row.original;
    //         // console.log("Apointment", apoointment);

    //         return <ActionButton product={product} />;
    //     },
    // },
];
