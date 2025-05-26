"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { educationPhase2Schema } from "@/interfaces/jobProfile.schemas";
import { updateProfileStep } from "@/lib/slices/profileSlice";
import { RootState } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import GraduationField from "./graduation-fields";
import MastersField from "./masters-fields";

interface EducationPhase2FormProps {
    onNext: () => void;
    onPrevious: () => void;
}

type EducationSchema = z.infer<typeof educationPhase2Schema>;

export function EducationPhase2Form({ onNext, onPrevious }: EducationPhase2FormProps) {
    const [isBachelorApplicable, setIsBachelorApplicable] = useState(false);
    const [isMastersApplicable, setIsMastersApplicable] = useState(false);

    const dispatch = useDispatch();
    const { profile } = useSelector((state: RootState) => state.profile);

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        unregister,
        watch,
    } = useForm<EducationSchema>({
        resolver: zodResolver(educationPhase2Schema),
        defaultValues: {
            if_applicable_gra: profile.if_applicable_gra || 0,
            gra_exam: profile.gra_exam || "",
            gra_institute: profile.gra_institute || "",
            gra_subject: profile.gra_subject || "",
            gra_result_type: profile.gra_result_type || "",
            gra_result: profile.gra_result || 0,
            gra_duration: profile.gra_duration || "",
            gra_year: profile.gra_year || "",

            if_applicable_mas: profile.if_applicable_mas || 0,
            mas_exam: profile.mas_exam || "",
            mas_institute: profile.mas_institute || "",
            mas_subject: profile.mas_subject || "",
            mas_result_type: profile.mas_result_type || "",
            mas_result: profile.mas_result || 0,
            mas_duration: profile.mas_duration || "",
            mas_year: profile.mas_year || "",
        },
    });
    console.log("Education info Errors:", errors);

    // Load previous values into form on mount
    useEffect(() => {
        if (profile.if_applicable_gra === 1) {
            setIsBachelorApplicable(profile.if_applicable_gra === 1);
        }
        if (profile.if_applicable_mas === 1) {
            setIsMastersApplicable(profile.if_applicable_mas === 1);
        }
        if (profile.if_applicable_gra || profile.if_applicable_mas) {
            reset({
                if_applicable_gra: profile.if_applicable_gra || 0,
                gra_exam: profile.gra_exam || "",
                gra_institute: profile.gra_institute || "",
                gra_subject: profile.gra_subject || "",
                gra_result_type: profile.gra_result_type || "",
                gra_result: profile.gra_result || 0,
                gra_duration: profile.gra_duration || "",
                gra_year: profile.gra_year || "",

                if_applicable_mas: profile.if_applicable_mas || 0,
                mas_exam: profile.mas_exam || "",
                mas_institute: profile.mas_institute || "",
                mas_subject: profile.mas_subject || "",
                mas_result_type: profile.mas_result_type || "",
                mas_result: profile.mas_result || 0,
                mas_duration: profile.mas_duration || "",
                mas_year: profile.mas_year || "",
            });
        }
    }, [profile, reset]);

    const onSubmit: SubmitHandler<EducationSchema> = async (data) => {
        console.log("Form data is:", data);

        let filteredData = { ...data };

        if (!isBachelorApplicable) {
            // Completely remove unwanted fields from submission payload
            delete filteredData.if_applicable_gra;
            delete filteredData.gra_exam;
            delete filteredData.gra_institute;
            delete filteredData.gra_subject;
            delete filteredData.gra_result_type;
            delete filteredData.gra_result;
            delete filteredData.gra_duration;
            delete filteredData.gra_year;
        }
        if (!isMastersApplicable) {
            // Completely remove unwanted fields from submission payload
            delete filteredData.if_applicable_mas;
            delete filteredData.mas_exam;
            delete filteredData.mas_institute;
            delete filteredData.mas_subject;
            delete filteredData.mas_result_type;
            delete filteredData.mas_result;
            delete filteredData.mas_duration;
            delete filteredData.mas_year;
        }

        console.log("Form data after cleaning:", filteredData);

        // Dispatch to Redux store
        dispatch(updateProfileStep(filteredData));
        // Proceed to next step
        onNext();
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Education Phase 2</CardTitle>
                <CardDescription>
                    Enter your Bachelor's and Master's degree information if applicable.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-start gap-3">
                            <h3 className="font-medium">Bachelor's Degree</h3>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="if_applicable_gra"
                                    checked={isBachelorApplicable}
                                    onCheckedChange={(checked) => {
                                        const isChecked = checked === true;
                                        setIsBachelorApplicable(isChecked);

                                        if (isChecked) {
                                            setValue("if_applicable_gra", 1);
                                        } else {
                                            setValue("if_applicable_gra", 0); // explicitly set to 0 for clarity
                                            unregister("gra_exam", { keepError: false });
                                            unregister("gra_institute", { keepError: false });
                                            unregister("gra_subject", { keepError: false });
                                            unregister("gra_result_type", { keepError: false });
                                            unregister("gra_result", { keepError: false });
                                            unregister("gra_duration", { keepError: false });
                                            unregister("gra_year", { keepError: false });
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor="if_applicable_gra"
                                    className="cursor-pointer text-sm font-normal">
                                    If Applicable
                                </Label>
                            </div>
                        </div>
                        <GraduationField
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
                            isBachelorApplicable={isBachelorApplicable}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-start gap-3">
                            <h3 className="font-medium">Master's Degree</h3>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="if_applicable_mas"
                                    checked={isMastersApplicable}
                                    onCheckedChange={(checked) => {
                                        const isChecked = checked === true;
                                        setIsMastersApplicable(isChecked);

                                        if (isChecked) {
                                            setValue("if_applicable_mas", 1);
                                        } else {
                                            setValue("if_applicable_mas", 0); // explicitly set to 0 for clarity
                                            unregister("mas_exam", { keepError: false });
                                            unregister("mas_institute", { keepError: false });
                                            unregister("mas_subject", { keepError: false });
                                            unregister("mas_result_type", { keepError: false });
                                            unregister("mas_result", { keepError: false });
                                            unregister("mas_duration", { keepError: false });
                                            unregister("mas_year", { keepError: false });
                                        }
                                    }}
                                />
                                <Label
                                    htmlFor="if_applicable_mas"
                                    className="cursor-pointer text-sm font-normal">
                                    If Applicable
                                </Label>
                            </div>
                        </div>
                        <MastersField
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
                            isMastersApplicable={isMastersApplicable}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={onPrevious}>
                        Back
                    </Button>
                    <Button type="submit">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </form>
        </>
    );
}
