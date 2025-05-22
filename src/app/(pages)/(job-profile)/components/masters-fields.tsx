"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import universities from "../data/universities.json";
import groupOptionsMap from "./ms-subject-data.json";

const MastersField = ({
    register,
    errors,
    control,
    watch,
    isMastersApplicable,
}: {
    register: any;
    errors: any;
    control: any;
    watch: any;
    isMastersApplicable: any;
}) => {
    console.log("isMastersApplicable is:", isMastersApplicable);
    const [open, setOpen] = useState(false);
    // const [selectedUniversity, setSelectedUniversity] = useState<{
    //     value: string;
    //     label: string;
    // } | null>(null);

    // // console.log("The selectedUniversity:", selectedUniversity);

    const selectedExam = useWatch({
        control,
        name: "mas_exam",
    });

    // Watch the SSC result type select value
    const selectedSscResultType = useWatch({
        control,
        name: "mas_result_type",
    });
    // Determine if GPA input should show (for value "4" or "5")
    const showGpaInput = selectedSscResultType === "4" || selectedSscResultType === "5";
    return (
        <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${isMastersApplicable ? "" : "hover:cursor-not-allowed"}`}>
            {/* POST GRADUATION EXAM TYPE */}
            <div className="">
                <Label htmlFor="mas_exam">
                    Examination <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="mas_exam"
                    render={({ field }) => (
                        <Select
                            disabled={!isMastersApplicable}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}>
                            <SelectTrigger id="mas_exam" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="1">M.A</SelectItem>
                                <SelectItem value="2">M.S.S</SelectItem>
                                <SelectItem value="3">M.Sc</SelectItem>
                                <SelectItem value="4">M.Com</SelectItem>
                                <SelectItem value="5">M.B.A</SelectItem>
                                <SelectItem value="6">L.L.M</SelectItem>
                                <SelectItem value="8">Kamil</SelectItem>
                                <SelectItem value="10">Masters Equivalent</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.mas_exam && (
                        <span className="text-xs text-red-500">{errors.mas_exam.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION Subject/Degree */}
            <div className="">
                <Label htmlFor="mas_subject">
                    Subject/Degree <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="mas_subject"
                    render={({ field }) => {
                        const examKey = selectedExam as "1" | "2" | undefined;
                        const options = groupOptionsMap["1"] ?? [];

                        return (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value ?? ""}
                                disabled={!selectedExam || !isMastersApplicable}>
                                <SelectTrigger className="h-11 bg-gray-100">
                                    <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100">
                                    {options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }}
                />

                <div className="h-5">
                    {errors.mas_subject && (
                        <span className="text-xs text-red-500">{errors.mas_subject.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION University */}
            <div className="flex flex-col gap-1">
                <Label htmlFor="mas_institute" className="mt-1.5">
                    University/Inst. <span className="text-red-500">*</span>
                </Label>

                <Controller
                    control={control}
                    name="mas_institute"
                    rules={{ required: "University is required" }}
                    render={({ field }) => {
                        const selectedOption = universities.find((u) => u.value === field.value);

                        return (
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        disabled={!isMastersApplicable}
                                        aria-expanded={open}
                                        className="h-11 w-full justify-between border-none bg-gray-100 font-normal text-muted-foreground hover:bg-gray-100 hover:text-muted-foreground">
                                        {selectedOption
                                            ? selectedOption.label
                                            : "Select university..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Select university..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No university found.</CommandEmpty>
                                            <CommandGroup>
                                                {universities.map((institute) => (
                                                    <CommandItem
                                                        key={institute.value}
                                                        value={institute.label}
                                                        onSelect={() => {
                                                            field.onChange(institute.value); // Only store value
                                                            setOpen(false);
                                                        }}
                                                        className={cn(
                                                            "cursor-pointer",
                                                            field.value === institute.value &&
                                                                "bg-gray-800 text-white",
                                                        )}>
                                                        {institute.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                field.value === institute.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        );
                    }}
                />
                <div className="h-5">
                    {errors.mas_institute && (
                        <span className="text-xs text-red-500">{errors.mas_institute.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION Result Type */}
            <section className="flex justify-between gap-5">
                <div className="w-full">
                    <Label htmlFor="mas_result_type">
                        Result <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="mas_result_type"
                        rules={{ required: "Result type is required" }}
                        render={({ field }) => (
                            <Select
                                disabled={!isMastersApplicable}
                                onValueChange={field.onChange}
                                value={field.value ?? ""}>
                                <SelectTrigger id="mas_result_type" className="h-11 bg-gray-100">
                                    <SelectValue placeholder="Select result type" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-100">
                                    <SelectItem value="1">1st Class</SelectItem>
                                    <SelectItem value="2">2nd Class</SelectItem>
                                    <SelectItem value="3">3rd Class</SelectItem>
                                    <SelectItem value="4">CGPA (out of 4)</SelectItem>
                                    <SelectItem value="5">CGPA (out of 5)</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className="h-5">
                        {errors.mas_result_type && (
                            <span className="text-xs text-red-500">
                                {errors.mas_result_type.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Conditionally show GPA input */}
                {showGpaInput && (
                    <div className="w-[60%] sm:w-full">
                        <Label htmlFor="mas_result">
                            Enter GPA <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            {...register("mas_result", {
                                required: "GPA is required",
                                validate: (value: string) => {
                                    // Only validate if GPA type is selected
                                    if (["1", "2", "6"].includes(watch("mas_result_type"))) {
                                        if (!value) return "GPA is required";

                                        const num = parseFloat(value);
                                        if (isNaN(num)) return "GPA must be a number";
                                        if (num < 1 || num > 5)
                                            return "GPA must be between 1.00 and 5.00";
                                    }
                                    // No validation if GPA is not selected
                                    return true;
                                },
                            })}
                            id="mas_result"
                            type="text"
                            className="h-11 bg-gray-100"
                            placeholder="Example '4.25','3.25'"
                        />
                        <div className="h-5">
                            {errors.mas_result && (
                                <span className="text-xs text-red-500">
                                    {errors.mas_result.message}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* GRADUATION YEAR */}
            <div className="">
                <Label htmlFor="mas_year">
                    Passing year <span className="text-red-500">*</span>
                </Label>
                <Input
                    {...register("mas_year")}
                    id="mas_year"
                    type="number"
                    disabled={!isMastersApplicable}
                    className="h-11 bg-gray-100"
                    placeholder="Enter year like '2000', '1998'"
                />
                <div className="h-5">
                    {errors.mas_year && (
                        <span className="text-xs text-red-500">{errors.mas_year.message}</span>
                    )}
                </div>
            </div>

            {/* GRADUATION DURATION */}
            <div className="">
                <Label htmlFor="mas_duration">
                    Course Duration <span className="text-red-600">*</span>
                </Label>
                <Controller
                    control={control}
                    name="mas_duration"
                    render={({ field }) => (
                        <Select
                            disabled={!isMastersApplicable}
                            onValueChange={field.onChange}
                            value={field.value ?? ""}>
                            <SelectTrigger id="mas_duration" className="h-11 bg-gray-100">
                                <SelectValue placeholder="Select Course Duration" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-100">
                                <SelectItem value="01">01 Year</SelectItem>
                                <SelectItem value="1.5">1.5 Years</SelectItem>
                                <SelectItem value="02">02 Years</SelectItem>
                                <SelectItem value="2.5">2.5 Years</SelectItem>
                                <SelectItem value="03">03 Years</SelectItem>
                                <SelectItem value="03+">3+ Years</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <div className="h-5">
                    {errors.mas_duration && (
                        <span className="text-xs text-red-500">{errors.mas_duration.message}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MastersField;
