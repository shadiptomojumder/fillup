"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createProfileSchema } from "@/interfaces/jobProfile.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { updateProfileStep } from "@/lib/slices/profileSlice";
import { useDispatch } from "react-redux";
import HSCField from "./hsc-fileds";
import SSCField from "./ssc-fields";

interface EducationFormProps {
    onNext: () => void;
    onPrevious: () => void;
}

const educationSchema = createProfileSchema.pick({
    ssc_exam: true,
    ssc_roll: true,
    ssc_group: true,
    ssc_group_other: true,
    ssc_board: true,
    ssc_board_other: true,
    ssc_result_type: true,
    ssc_result: true,
    ssc_year: true,
    hsc_exam: true,
    hsc_roll: true,
    hsc_group: true,
    hsc_group_other: true,
    hsc_board: true,
    hsc_board_other: true,
    hsc_result_type: true,
    hsc_result: true,
    hsc_year: true,
});
type EducationSchema = z.infer<typeof educationSchema>;

export function EducationPhase1Form({ onNext, onPrevious }: EducationFormProps) {
    const dispatch = useDispatch();
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = useForm<EducationSchema>({
        resolver: zodResolver(educationSchema),
    });
    console.log("Education info Errors:", errors);

    const onSubmit: SubmitHandler<EducationSchema> = async (data) => {
        console.log("Form data is:", data);
        // Dispatch to Redux store
        dispatch(updateProfileStep(data));
        // Proceed to next step
        onNext();
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Education Phase 1</CardTitle>
                <CardDescription>Enter your SSC and HSC qualifications.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    {/* SSC FIELDS */}
                    <div className="space-y-4">
                        <h3 className="font-medium">SSC or Equivalent</h3>
                        <SSCField
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
                        />
                    </div>

                    {/* HSC FIELDS */}
                    <div className="space-y-4">
                        <h3 className="font-medium">HSC or Equivalent</h3>
                        <HSCField
                            register={register}
                            errors={errors}
                            control={control}
                            watch={watch}
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
