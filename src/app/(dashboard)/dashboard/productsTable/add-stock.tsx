"use client";
import getProductById from "@/api/products/getProductById";
import updateProduct from "@/api/products/updateProduct";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { APIError } from "@/interfaces/common.schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, PackagePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddStock = ({ productId }: { productId: string }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [stock, setStock] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data: product } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById({productId:productId as string}),
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Product Successfully Updated");
                queryClient.invalidateQueries({ queryKey: ["products"] });
                setStock(null);
                setIsDialogOpen(false); // Close the dialog on success
            }
        },
        onError: (error: APIError) => {
            console.log("The CnangeSwitch Page Error is: ", error);

            if (error.statusCode === 409) {
                toast.warning("Product already exist.");
            } else if (error.statusCode === 400) {
                toast.warning(error.message || "Please fill all the required fields!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
        },
    });

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStock = Number(e.target.value);
        setStock(newStock);
        setIsTouched(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (stock !== null) {
            mutate({ productId, data: { stock: stock } });
        }
    };

    return (
        <div className="okey">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                    asChild
                    className="focus-visible:ring-0 focus-visible:outline-0">
                    <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-sky-100 text-sky-700">
                        <PackagePlus size={18} />
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                            Update Product Stock
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            This action cannot be undone. Are you sure that you want to update this{" "}
                            <span className="font-medium text-primary">{product?.name}</span> stock.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div className="w-full">
                                <Label htmlFor="stock" className="text-base font-semibold">
                                    Product Stock <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    placeholder="Enter Product stock"
                                    className="mt-2 h-11"
                                    onChange={handleStockChange}
                                />

                                <div className="h-5">
                                    {/* {errors.price && (
                                        <span className="text-xs text-red-500">
                                            {errors.price.message}
                                        </span>
                                    )} */}
                                </div>
                            </div>
                        </section>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                            <Button type="submit" disabled={!isTouched || isPending}>
                                {isPending ? (
                                    <Loader size={28} className="animate-spin text-white" />
                                ) : (
                                    ""
                                )}
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AddStock;
