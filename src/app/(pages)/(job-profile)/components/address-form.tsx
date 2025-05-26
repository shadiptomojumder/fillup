"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import PresentAddressFields from "./present-address-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addressSchema } from "@/interfaces/jobProfile.schemas";
import { updateProfileStep } from "@/lib/slices/profileSlice";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PermanentAddressFields from "./permanent-address-form";

interface AddressFormProps {
    onPrevious: () => void;
    isSaving: boolean;
}
type AddressSchema = z.infer<typeof addressSchema>;

export function AddressForm({ onPrevious, isSaving }: AddressFormProps) {
    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.profile);

    const [isSameAsPresent, setIsSameAsPresent] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        unregister,
        reset,
        watch,
    } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            same_as_present: profile.same_as_present || 0,
            present_careof: profile.present_careof || "",
            present_village: profile.present_village || "",
            present_district: profile.present_district || "",
            present_upazila: profile.present_upazila || "",
            present_post: profile.present_post || "",
            present_postcode: profile.present_postcode || "",
            permanent_careof: profile.permanent_careof || "",
            permanent_village: profile.permanent_village || "",
            permanent_district: profile.permanent_district || "",
            permanent_upazila: profile.permanent_upazila || "",
            permanent_post: profile.permanent_post || "",
            permanent_postcode: profile.permanent_postcode || "",
        },
    });
    console.log("Education info Errors:", errors);

    // Watch present address fields
    const presentAddressFields = useWatch({
        control,
        name: [
            "present_careof",
            "present_village",
            "present_district",
            "present_upazila",
            "present_post",
            "present_postcode",
        ],
    });

    // Sync present address to permanent if "Same as" is checked
    useEffect(() => {
        if (isSameAsPresent) {
            const [careof, village, district, upazila, post, postcode] = presentAddressFields;
            setValue("permanent_careof", careof);
            setValue("permanent_village", village);
            setValue("permanent_district", district);
            setValue("permanent_upazila", upazila);
            setValue("permanent_post", post);
            setValue("permanent_postcode", postcode);
        }
    }, [isSameAsPresent, presentAddressFields, setValue]);

    // Load previous values into form on mount
    useEffect(() => {
        if (profile?.same_as_present === 1) {
            setIsSameAsPresent(true);
        }
        if (profile?.present_careof || profile?.permanent_careof) {
            reset({
                same_as_present: profile.same_as_present || 1,
                present_careof: profile.present_careof || "",
                present_village: profile.present_village || "",
                present_district: profile.present_district || "",
                present_upazila: profile.present_upazila || "",
                present_post: profile.present_post || "",
                present_postcode: profile.present_postcode || "",
                permanent_careof: profile.permanent_careof || "",
                permanent_village: profile.permanent_village || "",
                permanent_district: profile.permanent_district || "",
                permanent_upazila: profile.permanent_upazila || "",
                permanent_post: profile.permanent_post || "",
                permanent_postcode: profile.permanent_postcode || "",
            });
        }
    }, [profile, reset]);

    const onSubmit: SubmitHandler<AddressSchema> = async (data) => {
        console.log("Form data is:", data);

        console.log("isSameAsPresent is:", isSameAsPresent);
        
        // Dispatch to Redux store
        dispatch(updateProfileStep(data));
    };
    return (
        <>
            <CardHeader>
                <CardTitle>Address Information</CardTitle>
                <CardDescription>Enter your present and permanent address details.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium">Present Address</h3>
                        <PresentAddressFields
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-start gap-3">
                            <h3 className="font-medium">Permanent Address</h3>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="same_as_present"
                                    checked={isSameAsPresent}
                                    onCheckedChange={(checked) => {
                                        const isChecked = checked === true;
                                        setIsSameAsPresent(isChecked);

                                        if (!isChecked) {
                                            // Clear permanent fields if unchecked
                                            const fields = [
                                                "careof",
                                                "village",
                                                "district",
                                                "upazila",
                                                "post",
                                                "postcode",
                                            ];
                                            fields.forEach((field) =>
                                                setValue(
                                                    `permanent_${field}` as keyof AddressSchema,
                                                    "",
                                                ),
                                            );
                                        } else {
                                            setValue("same_as_present", 0);
                                            unregister("permanent_careof", { keepError: false });
                                            unregister("permanent_village", { keepError: false });
                                            unregister("permanent_district", { keepError: false });
                                            unregister("permanent_upazila", { keepError: false });
                                            unregister("permanent_post", { keepError: false });
                                            unregister("permanent_postcode", { keepError: false });
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor="same_as_present"
                                    className="cursor-pointer text-sm font-normal">
                                    Same as Present Address
                                </Label>
                            </div>
                        </div>
                        <PermanentAddressFields
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
                            isSameAsPresent={isSameAsPresent}
                            setValue={setValue}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={onPrevious}>
                        Back
                    </Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </form>
        </>
    );
}
