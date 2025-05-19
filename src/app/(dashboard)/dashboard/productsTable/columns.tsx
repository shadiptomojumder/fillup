import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/interfaces/product.schemas";
import { ColumnDef } from "@tanstack/react-table";
import { FileImage } from "lucide-react";
import Image from "next/image";
import takaIcon from "../../../../../public/icons/taka.png";
import Actions from "./actions";
import CnangeSwitch from "./change-switch";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Product>[] = [
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
        id: "images",
        accessorKey: "images",
        header: () => <div className="text-nowrap"> Image</div>,
        cell: ({ row }) => {
            const images = row.getValue("images");
            const firstImage = Array.isArray(images) && images.length > 0 ? images[0] : null;
            return (
                <div className="">
                    {firstImage ? (
                        <Image
                            src={firstImage}
                            alt="thumbnail"
                            width={70}
                            height={70}
                            className="aspect-[415/332] min-w-[84px] max-w-[84px] rounded-md object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    ) : (
                        <div className="aspect-[415/332] max-w-[84px] w-[84px] flex items-center justify-center rounded-md bg-slate-200">
                            <FileImage />
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="line-clamp-2 w-fit max-w-[450px] min-w-[200px] text-sm capitalize">
                                {row.getValue("name")}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>{row.getValue("name")}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        // here i have an different approch to do filtering
        id: "category",
        accessorKey: "category.value",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
        cell: ({ row }) => {
            const category = row.original.category; // Access full category object
            return (
                <div className="w-fit text-base text-nowrap capitalize">
                    <Badge variant="primary" className="">
                        {category?.title}
                    </Badge>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            const categoryValue = row.getValue(id); // This is already a string
            return value.includes(categoryValue); // Compare directly
        },
    },
    {
        id: "price",
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-0.5 capitalize">
                    <Image
                        src={takaIcon}
                        alt="Taka Icon"
                        width={50}
                        height={50}
                        className="h-[15px] w-[15px]"
                    />

                    {row.getValue("price")}
                </div>
            );
        },
    },
    {
        id: "finalPrice",
        accessorKey: "finalPrice",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Final Price" />,
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-0.5 capitalize">
                    <Image
                        src={takaIcon}
                        alt="Taka Icon"
                        width={50}
                        height={50}
                        className="h-[15px] w-[15px]"
                    />

                    {row.getValue("finalPrice")}
                </div>
            );
        },
    },

    {
        id: "stock",
        accessorKey: "stock",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
        cell: ({ row }) => {
            const stock = row.getValue<number>("stock");
            return (
                <div className="text-base text-nowrap">
                    {stock === 0 ? (
                        <Badge variant="red">Out of Stock</Badge>
                    ) : (
                        <Badge variant="green" className="">
                            {stock} in Stock
                        </Badge>
                    )}
                </div>
            );
        },
    },
    // {
    //     id: "createdAt",
    //     accessorKey: "createdAt",
    //     header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    //     cell: ({ row }) => {
    //         const date = new Date(row.getValue("createdAt"));
    //         return <div className="capitalize">{format(date, "dd MMMM yy")}</div>;
    //     },
    // },
    {
        id: "isFeatured",
        accessorKey: "isFeatured",
        header: () => <div>Featured Product</div>,
        cell: ({ row }) => {
            const productId = row.getValue("id");
            const initialValue = row.getValue<boolean>("isFeatured");
            //console.log("isFeatured", isFeatured);

            return (
                <CnangeSwitch
                    fieldName={"isFeatured"}
                    initialValue={initialValue}
                    productId={productId as string}
                />
            );
        },
    },
    {
        id: "isWeekendDeal",
        accessorKey: "isWeekendDeal",
        header: () => <div>Weekend Deal</div>,
        cell: ({ row }) => {
            const productId = row.getValue("id");
            const initialValue = row.getValue<boolean>("isWeekendDeal");
            //console.log("isWeekendDeal", isWeekendDeal);

            return (
                <CnangeSwitch
                    fieldName={"isWeekendDeal"}
                    initialValue={initialValue}
                    productId={productId as string}
                />
            );
        },
    },
    {
        id: "id",
        accessorKey: "id",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const productId = row.getValue("id");
            //console.log("productId", productId);

            return <Actions productId={productId as string} />;
        },
    },
];
