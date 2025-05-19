import deleteProductImage from "@/api/products/deleteProductImage";
import { APIError } from "@/interfaces/common.schemas";
import { IProduct } from "@/interfaces/product.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

interface ProductImageBoardProps {
    product?: IProduct;
    productIsLoading: boolean;
}

const ProductImageBoard = ({ product, productIsLoading }: ProductImageBoardProps) => {
    const queryClient = useQueryClient();
    const [loadingImage, setLoadingImage] = useState<string | null>(null); // Track which image is being deleted

    const { mutate, isPending } = useMutation({
        mutationFn: deleteProductImage,
        onMutate: (variables) => {
            setLoadingImage(variables.imageUrl); // Set loading state for the clicked image
        },
        onSuccess: (response) => {
            console.log("The Response was:", response);
            console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Image successfully deleted");
                queryClient.invalidateQueries({ queryKey: ["product", product?.id] });
                setLoadingImage(null); // Reset loading state after success
            }
        },
        onError: (error: APIError) => {
            console.log("The Create Product Page Error is: ", error);
            setLoadingImage(null); // Reset loading state on error

            if (error.statusCode === 409) {
                toast.warning("Product already exist.");
            } else if (error.statusCode === 400) {
                toast.warning(error.message || "Please fill all the required fields!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
        },
    });

    const handleProductImageDelete = (imageUrl: string) => {
        mutate({ productId: product?.id as string, imageUrl });
    };

    return (
        <div className="px-5">
            <Label htmlFor="picture" className="block py-2 text-base font-semibold">
                Product Images
            </Label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {productIsLoading ? (
                    <>
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                    </>
                ) : product && product.images && product.images.length > 0 ? (
                    product.images.map((image: string, index: number) => (
                        <div key={index} className="group relative">
                            <Image
                                src={image || "/placeholder.svg"}
                                alt="Product preview"
                                width={100}
                                height={100}
                                className="h-32 w-full rounded-lg object-cover"
                            />

                            {loadingImage === image ? (
                                <div className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-red-700/30 opacity-100 backdrop-blur-sm backdrop-opacity-10 transition-opacity duration-200 ease-in-out hover:opacity-100">
                                    <Loader size={28} className="animate-spin text-white" />
                                </div>
                            ) : (
                                <div className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-red-700/30 opacity-0 backdrop-blur-sm backdrop-opacity-10 transition-opacity duration-200 ease-in-out hover:opacity-100">
                                    <button
                                        disabled={isPending}
                                        type="button"
                                        onClick={() => handleProductImageDelete(image)}
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm bg-red-200 p-1 text-red-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                                        aria-label="Remove image">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-4 flex h-32 w-full items-center justify-center rounded-lg bg-white font-semibold text-primary">
                        No image found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductImageBoard;
