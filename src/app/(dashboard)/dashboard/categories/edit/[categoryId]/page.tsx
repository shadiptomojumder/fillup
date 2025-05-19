"use client";
import getCategoryById from "@/api/categories/getCategoryById";
import UpdateCategory from "@/api/categories/updateCategory";
import CategoriesImageSelector from "@/components/dashboardComponents/categories-image-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFormData, categorySchema } from "@/interfaces/category.schemas";
import { ImageFile } from "@/interfaces/common.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, PackagePlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CategoryEditPage = () => {
    const [images, setImages] = useState<{ thumbnail: ImageFile | null; logo: ImageFile | null }>({
        thumbnail: null,
        logo: null,
    });
    const [initialImages, setInitialImages] = useState<{
        thumbnail: string | null;
        logo: string | null;
    }>({
        thumbnail: null,
        logo: null,
    });
    const [isImageChanged, setIsImageChanged] = useState<{ thumbnail: boolean; logo: boolean }>({
        thumbnail: false,
        logo: false,
    });
    const queryClient = useQueryClient();
    const router = useRouter();

    const params = useParams(); // Get URL parameters

    const { categoryId } = params;

    const { data: category } = useQuery({
        queryKey: ["category", categoryId],
        queryFn: () => getCategoryById({ categoryId: categoryId as string }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: category?.title || "",
            logo: category?.logo || "",
            thumbnail: category?.thumbnail || "",
        },
    });

    useEffect(() => {
        if (category) {
            if (category.thumbnail) {
                setImages((prevImages) => ({
                    ...prevImages,
                    thumbnail: {
                        id: category.thumbnail,
                        file: new File([], category.thumbnail),
                        preview: category.thumbnail,
                        name: category.thumbnail,
                        type: "image/png",
                    },
                }));
                setInitialImages((prevImages) => ({
                    ...prevImages,
                    thumbnail: category.thumbnail,
                }));
            }
            if (category.logo) {
                setImages((prevImages) => ({
                    ...prevImages,
                    logo: {
                        id: category.logo,
                        file: new File([], category.logo),
                        preview: category.logo,
                        name: category.logo,
                        type: "image/png",
                    },
                }));
                setInitialImages((prevImages) => ({
                    ...prevImages,
                    logo: category.logo,
                }));
            }
            setValue("title", category.title);
        }
    }, [category, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: UpdateCategory,
        onSuccess: (response) => {
            // console.log("The Response was:", response);
            // console.log("The Response.data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Category successfully updated");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
                reset();
                setImages({ thumbnail: null, logo: null });
                setInitialImages({ thumbnail: null, logo: null });
                setIsImageChanged({ thumbnail: false, logo: false });
                router.push("/dashboard/categories");
            }
        },
        onError: (error: {
            response?: { status: number };
            request?: XMLHttpRequest;
            message?: string;
        }) => {
            if (error?.response?.status == 409) {
                toast.warning("Product already created!!");
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
        if (data.title !== category?.title) {
            formData.append("title", data.title);
        }

        // Append thumbnail image file only if it has changed
        if (images.thumbnail && images.thumbnail.preview !== initialImages.thumbnail) {
            console.log("Thumbnail has changed, appending to FormData");
            formData.append("thumbnail", images.thumbnail.file);
        }

        // Append logo image file only if it has changed
        if (images.logo && images.logo.preview !== initialImages.logo) {
            console.log("Logo has changed, appending to FormData");
            formData.append("logo", images.logo.file);
        }

        if (categoryId) {
            mutate({ categoryId: categoryId as string, data: formData });
        } else {
            console.log("Category ID is undefined");
        }
    };
    return (
        <div className="px-4 py-5 sm:px-5 md:px-7 lg:px-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 flex flex-col items-start justify-between gap-3 lg:flex-row">
                    <div>
                        <h2 className="flex gap-2 text-center text-lg font-semibold text-primary sm:text-left">
                            <PackagePlus />
                            Edit Product Category
                        </h2>
                        <p className="text-start text-sm sm:text-left">
                            Select your image and suitable name for product and click create button.
                        </p>
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={
                            (!isDirty && !isImageChanged.thumbnail && !isImageChanged.logo) ||
                            isPending
                        }
                        className="hidden lg:block">
                        {isPending ? (
                            <>
                                <LoaderCircle className="animate-spin" /> Submitting
                            </>
                        ) : (
                            <>Save & Publish</>
                        )}
                    </Button>
                </div>

                <section className="mb-5 flex flex-col justify-between gap-5 lg:flex-row">
                    <section className="col-span-7 rounded-lg border-2 bg-gray-100 pb-5 lg:w-[80%]">
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
                                className="mt-2 h-11"
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

                    <section className="col-span-4 h-fit rounded-lg border-2 bg-gray-100 lg:w-[600px] lg:max-w-[600px]">
                        <h2 className="mb-3 border-b-2 border-primary px-5 py-2 text-lg font-semibold text-primary">
                            Media
                        </h2>
                        <div className="px-5">
                            <CategoriesImageSelector
                                images={images}
                                setImages={setImages}
                                setIsImageChanged={setIsImageChanged}
                            />

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

                <Button
                    type="submit"
                    size="lg"
                    disabled={
                        (!isDirty && !isImageChanged.thumbnail && !isImageChanged.logo) || isPending
                    }
                    className="w-full lg:hidden">
                    {isPending ? (
                        <>
                            <LoaderCircle className="animate-spin" /> Submitting
                        </>
                    ) : (
                        <>Save & Publish</>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default CategoryEditPage;
