"use client";
import getCategories from "@/api/categories/getCategories";
import getProductById from "@/api/products/getProductById";
import updateProduct from "@/api/products/updateProduct";
import ProductImageBoard from "@/components/dashboardComponents/product-image-board";
import ProductImageSelector from "@/components/dashboardComponents/product-image-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/interfaces/category.schemas";
import { APIError, ImageFile } from "@/interfaces/common.schemas";
import { ProductFormData, productSchema } from "@/interfaces/product.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PackagePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditProductPage = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [initialData, setInitialData] = useState<ProductFormData | null>(null);
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const router = useRouter();

    const params = useParams(); // Get URL parameters

    const { productId } = params;

    const { data: product, isLoading: productIsLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById({ productId: productId as string }),
        staleTime: 0, // Always fetch fresh data
        refetchOnMount: true,
    });

    const { data: categories } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            price: product?.price || 0,
            quantity: product?.quantity || "",
            category: product?.category?.id || "",
            description: product?.description || "",
        },
    });

    console.log("The Errors are:", errors);
    console.log("The isDirty is:", isDirty);

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("quantity", product.quantity);
            setValue("category", product.category.id);

            setInitialData({
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category: product.category.id,
            });
        }
    }, [product, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (response) => {
            // console.log("The Response was:", response);
            // console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Product successfully created");
                reset();
                setImages([]);
                queryClient.invalidateQueries({ queryKey: ["products"] });
                router.push("/dashboard/products");
            }
        },
        onError: (error: APIError) => {
            console.log("The Create Product Page Error is: ", error);

            if (error.statusCode === 409) {
                toast.warning("Product already exist.");
            } else if (error.statusCode === 400) {
                toast.warning(error.message || "Please fill all the required fields!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
        },
    });

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        if (!initialData) {
            toast.warning("No changes detected.");
            return;
        }

        const updatedData: Partial<ProductFormData> = {};

        // Check which fields have changed
        Object.keys(data).forEach((key) => {
            if (data[key as keyof ProductFormData] !== initialData[key as keyof ProductFormData]) {
                updatedData[key as keyof ProductFormData] = data[key as keyof ProductFormData];
            }
        });

        // Create FormData
        const formData = new FormData();

        // Append only changed fields
        Object.keys(updatedData).forEach((key) => {
            if (updatedData[key as keyof typeof updatedData] !== null) {
                formData.append(key, updatedData[key as keyof typeof updatedData] as string);
            }
        });

        // Append images only if they were changed
        if (isImageChanged && images.length > 0) {
            images.forEach((image) => {
                if (image.file) {
                    formData.append("images", image.file);
                }
            });
        }

        if (Object.keys(updatedData).length === 0 && !isImageChanged) {
            toast.info("No changes detected.");
            return;
        }

        console.log("data is:", data);
        console.log("update is:", updatedData);

        mutate({ productId: productId as string, data: formData });
    };

    return (
        <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                    <div>
                        <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                            <PackagePlus />
                            Edit Product
                        </h2>
                        <p className="text-start text-sm sm:text-left">
                            Select your image and suitable name for product and click create button.
                        </p>
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        className="hidden lg:block"
                        disabled={!(isDirty || isImageChanged) || isPending}>
                        {isPending ? (
                            <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" /> Submiting
                            </div>
                        ) : (
                            <>Save & Publish</>
                        )}
                    </Button>
                </div>

                <section className="flex flex-col justify-between gap-5 lg:flex-row">
                    <section className="col-span-7 rounded-lg border-2 bg-gray-100 pb-5 lg:w-[80%]">
                        <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                            General information
                        </h2>
                        <div className="px-5">
                            <Label htmlFor="name" className="text-base font-semibold">
                                Product Name <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("name")}
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter Product Name"
                                className="mt-2 h-11 bg-white"
                            />

                            <div className="h-5">
                                {errors.name && (
                                    <span className="text-xs text-red-500">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="px-5">
                            <Label htmlFor="description" className="text-base font-semibold">
                                Product Description <span className="text-red-600">*</span>
                            </Label>
                            <Textarea
                                {...register("description")}
                                id="description"
                                name="description"
                                placeholder="Enter Product Description"
                                className="mt-2 h-11 bg-white outline-primary"
                            />

                            <div className="h-5">
                                {errors.description && (
                                    <span className="text-xs text-red-500">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <section className="flex flex-col items-center justify-between px-5 sm:gap-5 xl:flex-row">
                            <div className="w-full">
                                <Label htmlFor="price" className="text-base font-semibold">
                                    Product Regular Price <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("price", {
                                        valueAsNumber: true,
                                    })}
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="Enter Product Price"
                                    className="mt-2 h-11 bg-white"
                                />

                                <div className="h-5">
                                    {errors.price && (
                                        <span className="text-xs text-red-500">
                                            {errors.price.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="w-full">
                                <Label htmlFor="category" className="text-base font-semibold">
                                    Product Category <span className="text-red-500">*</span>
                                </Label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={product?.category.value || "ok"}
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            onValueChange={(e) => {
                                                onChange(e);
                                            }}
                                            value={value}
                                            defaultValue={value}>
                                            <SelectTrigger className="mt-2 h-11 bg-white capitalize focus:ring-primary">
                                                <SelectValue placeholder="Select Product Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories &&
                                                    categories.length > 0 &&
                                                    categories.map(
                                                        (category: Category, i: number) => {
                                                            return (
                                                                <SelectItem
                                                                    className="capitalize"
                                                                    value={category?.id}
                                                                    key={i}>
                                                                    {category.title}
                                                                </SelectItem>
                                                            );
                                                        },
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <div className="h-5">
                                    {errors.category && (
                                        <span className="text-sm text-red-500">
                                            {errors.category.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="flex flex-col items-center justify-between px-5 sm:gap-5 xl:flex-row">
                            <div className="w-full">
                                <Label htmlFor="quantity" className="text-base font-semibold">
                                    Product Quantity <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("quantity")}
                                    id="quantity"
                                    name="quantity"
                                    type="text"
                                    placeholder="Enter Product Quantity"
                                    className="mt-2 h-11 bg-white"
                                />

                                <div className="h-5">
                                    {errors.quantity && (
                                        <span className="text-xs text-red-500">
                                            {errors.quantity.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="col-span-4 h-fit rounded-lg border-2 bg-gray-100 lg:w-[600px] lg:max-w-[600px]">
                        <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                            Product Media
                        </h2>

                        <ProductImageBoard product={product} productIsLoading={productIsLoading} />

                        <div className="px-5">
                            <Label htmlFor="picture" className="block py-2 text-base font-semibold">
                                Select Images <span className="text-red-600">*</span>
                            </Label>

                            <ProductImageSelector
                                images={images}
                                setImages={setImages}
                                setIsImageChanged={setIsImageChanged}
                            />

                            <div className="h-5">
                                {errors.name && (
                                    <span className="text-xs text-red-500">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>
                </section>
                <Button
                    type="submit"
                    size="lg"
                    className="mt-5 w-full lg:hidden"
                    disabled={!(isDirty || isImageChanged) || isPending}>
                    {isPending ? (
                        <>
                            <LoaderCircle className="animate-spin" /> Submiting
                        </>
                    ) : (
                        <>Save & Publish</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default EditProductPage;
