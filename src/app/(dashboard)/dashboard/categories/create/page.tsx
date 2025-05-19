"use client";
import CreateCategory from "@/api/categories/createCategory";
import CategoriesImageSelector from "@/components/dashboardComponents/categories-image-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormData, categorySchema } from "@/interfaces/category.schemas";
import { ImageFile } from "@/interfaces/common.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle, PackagePlus } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryCreatePage = () => {
    const [images, setImages] = useState<{ thumbnail: ImageFile | null; logo: ImageFile | null }>({
        thumbnail: null,
        logo: null,
    });
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: (response) => {
            console.log("The Response was:", response);
            console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Category successfully created");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                reset();
                setImages({ thumbnail: null, logo: null });
            }
        },
        onError: (error: AxiosError) => {
            console.log("The Create Category Error is: ", error);

            if (error?.response?.status == 409) {
                toast.warning("Category already created!!");
            } else if (error?.response?.status == 400) {
                toast.warning("Please fill all the required fields!");
            } else if (error.request) {
                toast.error("No response received from the server!!");
            } else {
                console.log("Error while sending the request:", error.message);
            }
        },
    });

    const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        const formData = new FormData();

        // Append text fields
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key as keyof typeof data]);
        });

        // Append thumbnail image file if provided
        if (images.thumbnail) {
            formData.append("thumbnail", images.thumbnail.file);
        }

        // Append logo image file if provided
        if (images.logo) {
            formData.append("logo", images.logo.file);
        }

        mutate(formData);
    };
    return (
        <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                    <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                        <div>
                            <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                                <PackagePlus />
                                Create New Product Category
                            </h2>
                            <p className="text-start text-sm sm:text-left">
                                Select your image and suitable name for product and click create
                                button.
                            </p>
                        </div>
                    </div>

                    <Button type="submit" size="lg" disabled={isPending} className="hidden lg:block">
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" /> Submiting
                            </span>
                        ) : (
                            <>Save & Publish</>
                        )}
                    </Button>
                </div>

                <section className="mb-5 flex flex-col justify-between gap-5 lg:flex-row">
                    {/* First Element */}
                    <section className="rounded-lg border-2 bg-gray-100 pb-5 lg:w-[80%]">
                        <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                            General information
                        </h2>
                        <div className="px-5">
                            <Label htmlFor="title" className="text-base font-semibold">
                                Category Title <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                {...register("title")}
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter Product Name"
                                className="mt-2 h-11 bg-white"
                            />

                            <div className="h-5">
                                {errors.title && (
                                    <span className="text-xs text-red-500">
                                        {errors.title.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Secoend Element */}
                    <section className="rounded-lg border-2 bg-gray-100 lg:w-[600px] lg:max-w-[600px]">
                        <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                            Category Media
                        </h2>
                        <div className="px-5">
                            <CategoriesImageSelector images={images} setImages={setImages} />

                            <div className="h-5">
                                {errors.thumbnail && (
                                    <span className="text-xs text-red-500">
                                        Please select a thumbnail
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>
                </section>

                <Button type="submit" size="lg" disabled={isPending} className="mt-5 w-full lg:hidden">
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

export default CategoryCreatePage;
