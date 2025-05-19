"use client";
import getUserById from "@/api/users/getUserById";
import updateUser from "@/api/users/updateUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminContext from "@/context/admin-context";
import { APIError, ImageFile } from "@/interfaces/common.schemas";
import { ProfileUpdateSchema, profileUpdateSchema } from "@/interfaces/user.schemas";
import { RootState } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import AvatarUpload from "../components/avatar-upload";

const MyProfile = () => {
    const [image, setImage] = useState<ImageFile | null>(null);
    const [isImageChanged, setIsImageChanged] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const { user } = useSelector((state: RootState) => state.user);
    const { data: userData } = useQuery({
        queryKey: ["user", user?.id],
        queryFn: () => getUserById({ userId: user!.id }),
    });

    // console.log("User data:", userData);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<ProfileUpdateSchema>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: userData || {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            avatar: "",
        },
    });

    useEffect(() => {
        if (userData) {
            reset(userData);
            if (userData.avatar) {
                setImage({
                    id: userData.avatar,
                    file: new File([], userData.avatar),
                    preview: userData.avatar,
                    name: userData.avatar,
                    type: "image/png",
                });
            }
        }
    }, [userData, reset]);

    console.log("isDirty :", isDirty);
    console.log("isImageChanged :", isImageChanged);

    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: (response) => {
            console.log("The Response was:", response);
            console.log("The my profile Response Data was:", response.data);

            if (response.statusCode === 200) {
                toast.success("Product successfully created");
                queryClient.invalidateQueries({ queryKey: ["user", user?.id] });

                window.location.reload();
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

    const onSubmit: SubmitHandler<ProfileUpdateSchema> = async (formData) => {
        const updatedData = new FormData();

        // List of fields to check
        const fieldsToCheck = ["firstName", "lastName", "phone", "email", "address"] as const;

        // Append only changed fields
        fieldsToCheck.forEach((field) => {
            if (formData[field] && formData[field] !== userData?.[field]) {
                updatedData.append(field, formData[field]!); // '!' ensures non-undefined value
            }
        });
        // Append image if changed
        if (isImageChanged && image?.file) {
            updatedData.append("avatar", image.file);
        }
        // Prevent unnecessary request if no changes
        if (!updatedData.has("avatar") && !fieldsToCheck.some((field) => updatedData.has(field))) {
            console.log("No changes detected.");
            return;
        }

        // ✅ Use more specific type
        const formDataObj: Record<string, string | Blob> = {};

        updatedData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        console.log("Updated Data:", formDataObj);

        mutate({ userId: user?.id as string, data: updatedData });
    };

    return (
        <AdminContext role="USER">
            <div className="container mx-auto px-3 py-15 sm:px-0">
                <div className="mb-8 space-y-2">
                    <h1 className="text-center text-3xl font-bold">My Profile</h1>
                    <p className="text-center text-muted-foreground">
                        View and update your personal information.
                    </p>
                </div>
                <Card className="mx-auto lg:w-[800px]">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5 md:mb-8">
                                <AvatarUpload
                                    image={image}
                                    setImage={setImage}
                                    setIsImageChanged={setIsImageChanged}
                                />
                                <p className="mt-3 text-center text-sm text-gray-500">
                                    Click to upload a new profile picture
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 md:gap-4">
                                <div className="">
                                    <Label htmlFor="firstName" className="mb-2">
                                        First Name <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        {...register("firstName")}
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        type="text"
                                    />
                                    <div className="h-5">
                                        {errors.firstName && (
                                            <span className="text-xs text-red-500">
                                                {errors.firstName.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="">
                                    <Label htmlFor="lastName" className="mb-2">
                                        Last Name <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        {...register("lastName")}
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        type="text"
                                    />
                                    <div className="h-5">
                                        {errors.lastName && (
                                            <span className="text-xs text-red-500">
                                                {errors.lastName.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <Label htmlFor="email" className="mb-2">
                                    Email <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    placeholder="Enter your email"
                                    type="text"
                                    disabled={userData?.email ? true : false}
                                />
                                <div className="h-5">
                                    {errors.email && (
                                        <span className="text-xs text-red-500">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="">
                                <Label htmlFor="phone" className="mb-2">
                                    Phone <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("phone")}
                                    id="phone"
                                    placeholder="Enter your phone"
                                    type="text"
                                    disabled={userData?.phone ? true : false}
                                />
                                <div className="h-5">
                                    {errors.phone && (
                                        <span className="text-xs text-red-500">
                                            {errors.phone.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="">
                                <Label htmlFor="address" className="mb-2">
                                    address <span className="text-red-600">*</span>
                                </Label>
                                <Input
                                    {...register("address")}
                                    id="address"
                                    placeholder="Enter your address"
                                    type="text"
                                />
                                <div className="h-5">
                                    {errors.address && (
                                        <span className="text-xs text-red-500">
                                            {errors.address.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="lg"
                                type="submit"
                                disabled={!(isDirty || isImageChanged) || isPending}
                                className="w-full">
                                {isPending ? (
                                    <>
                                        <LoaderCircle className="animate-spin" /> Saving
                                    </>
                                ) : (
                                    <>Save the changes</>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminContext>
    );
};

export default MyProfile;
