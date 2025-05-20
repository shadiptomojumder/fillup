"use client";

import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createProfileSchema } from "@/interfaces/jobProfile.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { groupOptionsMap } from "./data";
import SSCField from "./ssc-field";

interface EducationFormProps {
    onNext: () => void;
    onPrevious: () => void;
}

const educationSchema = createProfileSchema.pick({
    ssc: true,
    // hsc: true,
});
type EducationSchema = z.infer<typeof educationSchema>;

export function EducationForm({ onNext, onPrevious }: EducationFormProps) {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<EducationSchema>({
        resolver: zodResolver(educationSchema),
    });
    console.log("Education info Errors:", errors);
   

    const onSubmit: SubmitHandler<EducationSchema> = async (data) => {
        console.log("Form data is:", data);
    };

    return (
        <>
            <CardHeader>
                <CardTitle>Educational Information</CardTitle>
                <CardDescription>Enter your educational qualifications.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium">SSC or Equivalent</h3>
                        <SSCField register={register} errors={errors} control={control}/>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">HSC or Equivalent</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="hsc-board">Board</Label>
                                <Input id="hsc-board" placeholder="Dhaka" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hsc-year">Year</Label>
                                <Input id="hsc-year" placeholder="2012" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hsc-roll">Roll Number</Label>
                                <Input id="hsc-roll" placeholder="123456" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hsc-result">Result (GPA)</Label>
                                <Input id="hsc-result" placeholder="5.00" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Bachelor's Degree</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="bachelor-university">University/Institution</Label>
                                <Input id="bachelor-university" placeholder="University of Dhaka" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bachelor-degree">Degree</Label>
                                <Input id="bachelor-degree" placeholder="BSc in Computer Science" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bachelor-year">Passing Year</Label>
                                <Input id="bachelor-year" placeholder="2016" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bachelor-result">Result (CGPA/Class)</Label>
                                <Input id="bachelor-result" placeholder="3.80" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Master's Degree (if applicable)</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="masters-university">University/Institution</Label>
                                <Input id="masters-university" placeholder="University of Dhaka" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="masters-degree">Degree</Label>
                                <Input id="masters-degree" placeholder="MSc in Computer Science" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="masters-year">Passing Year</Label>
                                <Input id="masters-year" placeholder="2018" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="masters-result">Result (CGPA/Class)</Label>
                                <Input id="masters-result" placeholder="3.90" />
                            </div>
                        </div>
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
