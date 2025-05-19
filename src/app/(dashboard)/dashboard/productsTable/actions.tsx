"use client";
import deleteProducts from "@/api/products/deleteProduct";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, Loader, Pencil, Settings2, Trash2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import AddStock from "./add-stock";

const Actions = ({ productId }: { productId: string }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: [],
        mutationFn: deleteProducts,
        onSuccess: (response) => {
            console.log("the res is ", response);

            if (response.statusCode === 200) {
                toast.success("Product successfully deleted");
                queryClient.invalidateQueries({ queryKey: ["products"] });
                setIsDeleteDialogOpen(false);
            }
        },
        onError: (error: AxiosError) => {
            if (error?.response?.status == 400) {
                toast.warning("Missing product Id");
            } else if (error?.response?.status == 500) {
                toast.error("Something went wrong during an appointment");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.log("Error while sending the request:", error.message);
            }
        },
    });

    const handleDelete = () => {
        mutate({ productId });
    };

    return (
        <>
            <div className="hidden items-center gap-2 min-sm:flex">
                <Link
                    href={`/dashboard/products/edit/${productId}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d7f2dc] text-primary">
                    <Pencil size={18} />
                </Link>
                <AlertDialog open={isDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <button
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-200 text-red-700">
                            <Trash2 size={18} />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="shadow-2xl drop-shadow-lg">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-1.5 text-red-700">
                                <TriangleAlert />
                                <span className="text-black">Are you absolutely sure?</span>
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-700">
                                This action cannot be undone. This will permanently delete this
                                appointment and remove this data from the servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={setIsDeleteDialogOpen.bind(null, false)}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                disabled={isPending}
                                className="bg-red-700 hover:bg-red-700">
                                {isPending ? (
                                    <>
                                        <Loader className="animate-spin" />
                                        Deleting
                                    </>
                                ) : (
                                    "Delete"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AddStock productId={productId} />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden w-full justify-center max-sm:flex">
                    <button className="w-fit rounded-md bg-gray-100 p-2">
                        <Settings2 size={18} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer font-medium">
                            View
                            <DropdownMenuShortcut>
                                <Eye />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <Link href={`/dashboard/products/edit/${productId}`}>
                            <DropdownMenuItem className="cursor-pointer font-medium">
                                Edit
                                <DropdownMenuShortcut>
                                    <Pencil />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => handleDelete()}
                            className="cursor-pointer bg-red-200 font-medium text-red-700 hover:bg-red-200 hover:text-red-700 focus:bg-red-200 focus:text-red-700">
                            Delete
                            <DropdownMenuShortcut>
                                <Trash2 className="text-red-700" />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default Actions;
